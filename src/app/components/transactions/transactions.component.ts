import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  transaction: Transaction = {
    type: 'income',
    category: '',
    amount: 0,
    date: new Date(),
    description: '',
  };

  filter: string = '';
  totalIncome: number = 0;
  totalExpense: number = 0;
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

    this.calculateTotals();


    this.transactionsService.transactionsChanged.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.transactionsService.getAnnualIncomeExpense().subscribe((totals) => {
      let totalIncome = 0;
      let totalExpense = 0;

      totals.forEach((month) => {
        totalIncome += month.income;
        totalExpense += month.expense;
      });

      this.totalIncome = totalIncome;
      this.totalExpense = totalExpense;
    });
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe((transactions) => {
      // Filtra las transacciones por el mes y el año seleccionados
      this.transactions = transactions
        .filter(
          (t) =>
            new Date(t.date).getFullYear() === this.selectedYear &&
            new Date(t.date).getMonth() + 1 === this.selectedMonth
        )
        // Ordena las transacciones por fecha (de más reciente a más antigua)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

  addTransaction(): void {
    this.transactionsService.addTransaction(this.transaction).then(() => {
      this.transaction = {
        type: 'income',
        category: '',
        amount: 0,
        date: new Date(),
        description: '',
      };
      this.showForm = false;
      this.loadTransactions();
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  toggleDeleteIcons(): void {
    this.showDeleteIcons = !this.showDeleteIcons;
  }

  deleteTransaction(id: string): void {
    this.transactionsService.deleteTransaction(id).then(() => {
      this.loadTransactions();
    });
  }

  onDateChange(): void {
    this.loadTransactions();
  }

  prevMonth(): void {
    if (this.selectedMonth === 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.loadTransactions();
  }

  nextMonth(): void {
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
