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
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaction;
        // Asegúrate de que 'date' se convierte en una instancia de Date
        data.date = new Date(data.date);
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions;
  }

  addTransaction(transaction: Transaction): Promise<void> {
    const id = this.firestore.createId();
    return this.transactionsCollection.doc(id).set(transaction).then(() => {
      this.transactionsChanged.next();
    });
  }

  deleteTransaction(id: string): Promise<void> {
    return this.transactionsCollection.doc(id).delete().then(() => {
      this.transactionsChanged.next();
    });
  }

  updateTransaction(id: string, transaction: Transaction): Promise<void> {
    return this.transactionsCollection.doc(id).update(transaction).then(() => {
      this.transactionsChanged.next();
    });
  }

  getTotals(): Observable<{ income: number; expense: number }> {
    return this.getTransactions().pipe(
      map(transactions => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense };
      })
    );
  }

  getTotalsByCategory(): Observable<{ [category: string]: number }> {
    return this.getTransactions().pipe(
      map(transactions => {
        return transactions.reduce((acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = 0;
          }
          acc[t.category] += t.amount;
          return acc;
        }, {} as { [category: string]: number });
      })
    );
  }

  getTransactionsByMonth(year: number, month: number): Observable<Transaction[]> {
    return this.getTransactions().pipe(
      map(transactions =>
        transactions
          .filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getFullYear() === year && transactionDate.getMonth() === month;
          })
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Ordena de más reciente a más antigua
      )
    );
  }

  getAnnualIncomeExpense(): Observable<{ income: number; expense: number }[]> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return this.getTransactions().pipe(
      map(transactions => {
        const result = Array(12).fill(null).map(() => ({ income: 0, expense: 0 }));
        transactions.forEach(t => {
          const month = t.date.getMonth();
          if (t.date.getFullYear() === currentYear && month <= currentMonth) {
            if (t.type === 'income') {
              result[month].income += t.amount;
            } else {
              result[month].expense += t.amount;
            }
          }
        });
        return result;
      })
    );
  }

  getAnnualExpensesByCategory(): Observable<{ [category: string]: number }> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return this.getTransactions().pipe(
      map(transactions => {
        const annualTransactions = transactions.filter(
          t => t.date.getFullYear() === currentYear && t.type === 'expense' && t.date.getMonth() <= currentMonth
        );
        return annualTransactions.reduce((acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = 0;
          }
          acc[t.category] += t.amount;
          return acc;
        }, {} as { [category: string]: number });
      })
    );
  }

  getMonthlyExpensesByCategory(year: number, month: number): Observable<{ [category: string]: number }> {
    return this.getTransactions().pipe(
      map(transactions => {
        const monthlyTransactions = transactions.filter(
          t => t.date.getFullYear() === year && t.date.getMonth() === month - 1 && t.type === 'expense'
        );
        return monthlyTransactions.reduce((acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = 0;
          }
          acc[t.category] += t.amount;
          return acc;
        }, {} as { [category: string]: number });
      })
    );
  }
}
