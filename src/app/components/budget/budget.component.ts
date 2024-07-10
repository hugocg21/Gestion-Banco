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
    amount: 0
  };
  budgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.budgetService.addBudget(this.budget);
      form.resetForm();
      this.budget = { category: '', amount: 0 };
      this.budgets = this.budgetService.getBudgets();
    }
  }

  deleteBudget(category: string) {
    this.budgetService.deleteBudget(category);
    this.budgets = this.budgetService.getBudgets();
  }
}
