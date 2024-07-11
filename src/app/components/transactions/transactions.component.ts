import { Component, OnInit } from '@angular/core';
import { TransactionsService, Transaction } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  transaction: Transaction = {
    id: 0,
    type: 'income',
    category: '',
    amount: 0,
    date: new Date(),
    description: ''
  };
  filter: string = '';
  filterCategory: string = '';
  categories: string[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  loadCategories(): void {
    this.categories = this.transactionsService.getCategories();
  }

  addTransaction() {
    this.transactionsService.addTransaction(this.transaction);
    this.transaction = {
      id: 0,
      type: 'income',
      category: '',
      amount: 0,
      date: new Date(),
      description: ''
    };
    this.loadTransactions(); // Reload transactions after adding a new one
  }

  deleteTransaction(id: number): void {
    this.transactionsService.deleteTransaction(id);
    this.loadTransactions(); // Reload transactions after deletion
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(transaction => {
      return (this.filter === '' || transaction.description.toLowerCase().includes(this.filter.toLowerCase())) &&
             (this.filterCategory === '' || transaction.category === this.filterCategory);
    });
  }
}
