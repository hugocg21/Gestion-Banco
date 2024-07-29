import { Component, OnInit } from '@angular/core';
import { TransactionsService, Transaction } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  transaction: Transaction = {
    id: 0,
    type: 'income',
    category: '',
    amount: 0,
    date: new Date(),
    description: '',
  };

  filter: string = '';
  incomeFilterCategory: string = '';
  expenseFilterCategory: string = '';
  incomeCategories: string[] = [];
  expenseCategories: string[] = [];
  showForm: boolean = false;
  showDeleteIcons: boolean = false;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  years: number[] = [2024, 2025];
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions.filter(
        (t) =>
          new Date(t.date).getFullYear() === this.selectedYear &&
          new Date(t.date).getMonth() + 1 === this.selectedMonth
      );
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.incomeCategories = [
      ...new Set(
        this.transactions
          .filter((t) => t.type === 'income')
          .map((t) => t.category)
      ),
    ];
    this.expenseCategories = [
      ...new Set(
        this.transactions
          .filter((t) => t.type === 'expense')
          .map((t) => t.category)
      ),
    ];
  }

  addTransaction() {
    this.transactionsService.addTransaction(this.transaction);
    this.transaction = {
      id: 0,
      type: 'income',
      category: '',
      amount: 0,
      date: new Date(),
      description: '',
    };
    this.showForm = false;
    this.loadTransactions();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleDeleteIcons() {
    this.showDeleteIcons = !this.showDeleteIcons;
  }

  deleteTransaction(id: number): void {
    this.transactionsService.deleteTransaction(id);
    this.loadTransactions();
  }

  onDateChange() {
    this.loadTransactions();
  }

  prevMonth() {
    if (this.selectedMonth === 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.loadTransactions();
  }

  nextMonth() {
    if (this.selectedMonth === 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.loadTransactions();
  }

  get filteredIncomeTransactions(): Transaction[] {
    return this.transactions.filter((transaction) => {
      return (
        transaction.type === 'income' &&
        (this.incomeFilterCategory === '' ||
          transaction.category === this.incomeFilterCategory)
      );
    });
  }

  get filteredExpenseTransactions(): Transaction[] {
    return this.transactions.filter((transaction) => {
      return (
        transaction.type === 'expense' &&
        (this.expenseFilterCategory === '' ||
          transaction.category === this.expenseFilterCategory)
      );
    });
  }
}
