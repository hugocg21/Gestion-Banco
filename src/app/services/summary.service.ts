import { Injectable } from '@angular/core';
import { TransactionsService, Transaction } from './transactions.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private transactionsService: TransactionsService) { }

  getTotals(): Observable<{ income: number, expense: number }> {
    return this.transactionsService.getTransactions().pipe(
      map(transactions => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense };
      })
    );
  }

  getTotalsByCategory(): Observable<{ [category: string]: number }> {
    return this.transactionsService.getTransactions().pipe(
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

  getTotalsByMonth(year: number, month: number): Observable<{ income: number, expense: number }> {
    return this.transactionsService.getTransactionsByMonth(year, month).pipe(
      map(transactions => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense };
      })
    );
  }

  getTotalsByCategoryAndMonth(year: number, month: number): Observable<{ [category: string]: number }> {
    return this.transactionsService.getTransactionsByMonth(year, month).pipe(
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
}
