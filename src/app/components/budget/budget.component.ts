import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService, Budget } from '../../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budget: Budget = {
    category: '',
    amount: 0,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  };
  budgets: Budget[] = [];
  showForm: boolean = false;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.budget.year = this.selectedYear;
      this.budget.month = this.selectedMonth;
      this.budgetService.addBudget(this.budget);
      form.resetForm();
      this.budget = { category: '', amount: 0, year: this.selectedYear, month: this.selectedMonth };
      this.loadBudgets();
      this.showForm = false;
    }
  }

  deleteBudget(category: string) {
    this.budgetService.deleteBudget(category, this.selectedYear, this.selectedMonth);
    this.loadBudgets();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadBudgets() {
    this.budgets = this.budgetService.getBudgetsByMonth(this.selectedYear, this.selectedMonth);
  }

  onMonthChange() {
    this.loadBudgets();
  }
}
