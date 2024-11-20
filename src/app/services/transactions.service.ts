import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;
  transactionsChanged: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private firestore: AngularFirestore) {
    this.transactionsCollection = firestore.collection<Transaction>('transactions');

    this.transactions = this.transactionsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Transaction;
          data.date = new Date(data.date); // Convertir la fecha en instancia de Date
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  // Obtener todas las transacciones
  getTransactions(): Observable<Transaction[]> {
    return this.transactions;
  }

  // Agregar una nueva transacción
  addTransaction(transaction: Transaction): Promise<void> {
    const id = this.firestore.createId();
    return this.transactionsCollection.doc(id).set(transaction).then(() => {
      this.transactionsChanged.next();
    });
  }

  // Actualizar una transacción existente
  updateTransaction(id: string, transaction: Transaction): Promise<void> {
    return this.transactionsCollection.doc(id).update(transaction).then(() => {
      this.transactionsChanged.next();
    });
  }

  // Eliminar una transacción
  deleteTransaction(id: string): Promise<void> {
    return this.transactionsCollection.doc(id).delete().then(() => {
      this.transactionsChanged.next();
    });
  }

  // Totales anuales por mes (ingresos y gastos)
  getMonthlyIncomeAndExpenses(): Observable<{ income: number[]; expense: number[] }> {
    return this.getTransactions().pipe(
      map(transactions => {
        const monthlyIncome = new Array(12).fill(0);
        const monthlyExpenses = new Array(12).fill(0);

        transactions.forEach(transaction => {
          const month = new Date(transaction.date).getMonth();

          if (transaction.type === 'income') {
            if (transaction.category === 'Bizum') {
              monthlyExpenses[month] -= transaction.amount; // Restar Bizum a los gastos
            } else {
              monthlyIncome[month] += transaction.amount; // Sumar otros ingresos
            }
          } else if (transaction.type === 'expense') {
            monthlyExpenses[month] += transaction.amount; // Sumar todos los gastos
          }
        });

        // Asegurar que los gastos no sean negativos
        const adjustedExpenses = monthlyExpenses.map(expense => (expense < 0 ? 0 : expense));

        return { income: monthlyIncome, expense: adjustedExpenses };
      })
    );
  }

  // Gastos por categoría ajustados
  getAnnualExpensesByCategory(): Observable<{ [category: string]: number }> {
    return this.getTransactions().pipe(
      map(transactions => {
        const expensesByCategory: { [category: string]: number } = {};

        transactions.forEach(transaction => {
          if (transaction.type === 'expense') {
            if (!expensesByCategory[transaction.category]) {
              expensesByCategory[transaction.category] = 0;
            }
            expensesByCategory[transaction.category] += transaction.amount; // Sumar gastos
          }

          if (transaction.type === 'income' && transaction.category === 'Bizum') {
            if (!expensesByCategory['Otros']) {
              expensesByCategory['Otros'] = 0;
            }
            expensesByCategory['Otros'] -= transaction.amount; // Restar Bizum de "Otros"
          }
        });

        // Asegurar que no haya valores negativos
        Object.keys(expensesByCategory).forEach(category => {
          if (expensesByCategory[category] < 0) {
            expensesByCategory[category] = 0;
          }
        });

        return expensesByCategory;
      })
    );
  }

  // Transacciones filtradas por mes y año
  getTransactionsByMonth(year: number, month: number): Observable<Transaction[]> {
    return this.getTransactions().pipe(
      map(transactions =>
        transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getFullYear() === year && transactionDate.getMonth() === month - 1;
        })
      )
    );
  }

  // Totales anuales desglosados por mes
  getAnnualIncomeExpense(): Observable<{ income: number; expense: number }[]> {
    return this.getMonthlyIncomeAndExpenses().pipe(
      map(data => {
        return data.income.map((income, index) => ({
          income,
          expense: data.expense[index],
        }));
      })
    );
  }
}
