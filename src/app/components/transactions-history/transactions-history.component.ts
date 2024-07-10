import { Component, OnInit } from '@angular/core';
import { TransactionsService, Transaction } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent implements OnInit {
  transactions: Transaction[] = [];
  filter: string = '';
  filterCategory: string = '';
  categories: string[] = [];

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactions = this.transactionsService.getTransactions();
    this.categories = [...new Set(this.transactions.map(t => t.category))];
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(t => {
      return (!this.filter || t.description.toLowerCase().includes(this.filter.toLowerCase())) &&
             (!this.filterCategory || t.category === this.filterCategory);
    });
  }

  deleteTransaction(id: number) {
    this.transactionsService.deleteTransaction(id);
    this.transactions = this.transactionsService.getTransactions();
  }
}
