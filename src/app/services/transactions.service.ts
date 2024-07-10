import { Injectable } from '@angular/core';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactions: Transaction[] = [
    { id: 1, type: 'income', category: 'Salario', amount: 3000, date: new Date('2024-01-01'), description: 'Salario de enero' },
    { id: 2, type: 'expense', category: 'Alquiler', amount: 1000, date: new Date('2024-01-05'), description: 'Pago de alquiler' },
    { id: 3, type: 'expense', category: 'Supermercado', amount: 150, date: new Date('2024-01-06'), description: 'Compra en supermercado' },
    { id: 4, type: 'expense', category: 'Transporte', amount: 50, date: new Date('2024-01-07'), description: 'Gastos de transporte' },
    { id: 5, type: 'income', category: 'Freelance', amount: 500, date: new Date('2024-01-10'), description: 'Trabajo freelance' },
    { id: 6, type: 'expense', category: 'Entretenimiento', amount: 100, date: new Date('2024-01-12'), description: 'Cine y cena' },
    { id: 7, type: 'expense', category: 'Salud', amount: 200, date: new Date('2024-01-15'), description: 'Compra de medicamentos' },
    { id: 8, type: 'income', category: 'Venta', amount: 300, date: new Date('2024-01-18'), description: 'Venta de artículos usados' },
    { id: 9, type: 'expense', category: 'Educación', amount: 250, date: new Date('2024-01-20'), description: 'Curso online' },
    { id: 10, type: 'expense', category: 'Restaurante', amount: 80, date: new Date('2024-01-22'), description: 'Cena en restaurante' },
    // Añadir más datos de prueba aquí
  ];

  constructor() { }

  addTransaction(transaction: Transaction): void {
    transaction.id = this.transactions.length ? Math.max(...this.transactions.map(t => t.id)) + 1 : 1;
    this.transactions.push(transaction);
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  filterTransactions(category: string): Transaction[] {
    return this.transactions.filter(t => t.category === category);
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }

  getTotals(): { income: number, expense: number } {
    const income = this.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = this.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expense };
  }

  getTotalsByCategory(): { [category: string]: number } {
    return this.transactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as { [category: string]: number });
  }
}
