import { Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private transactionsService: TransactionsService) { }

  getTotals(): { income: number, expense: number } {
    const transactions = this.transactionsService.getTransactions();
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expense };
  }

  getTotalsByCategory(): { [category: string]: number } {
    const transactions = this.transactionsService.getTransactions();
    return transactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as { [category: string]: number });
  }
}
