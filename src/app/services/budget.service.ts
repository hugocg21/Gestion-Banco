import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

export interface Budget {
  category: string;
  amount: number;
  year: number;
  month: number;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgets: Budget[] = [
    { category: 'Alquiler', amount: 1000, year: 2024, month: 1 },
    { category: 'Supermercado', amount: 500, year: 2024, month: 1 },
    { category: 'Transporte', amount: 200, year: 2024, month: 1 },
    { category: 'Entretenimiento', amount: 150, year: 2024, month: 1 },
    { category: 'Salud', amount: 300, year: 2024, month: 1 },
    { category: 'Educación', amount: 400, year: 2024, month: 1 },
    { category: 'Restaurante', amount: 200, year: 2024, month: 1 },

    { category: 'Alquiler', amount: 1050, year: 2024, month: 2 },
    { category: 'Supermercado', amount: 520, year: 2024, month: 2 },
    { category: 'Transporte', amount: 210, year: 2024, month: 2 },
    { category: 'Entretenimiento', amount: 160, year: 2024, month: 2 },
    { category: 'Salud', amount: 310, year: 2024, month: 2 },
    { category: 'Educación', amount: 420, year: 2024, month: 2 },
    { category: 'Restaurante', amount: 220, year: 2024, month: 2 },

    { category: 'Alquiler', amount: 1100, year: 2024, month: 3 },
    { category: 'Supermercado', amount: 540, year: 2024, month: 3 },
    { category: 'Transporte', amount: 220, year: 2024, month: 3 },
    { category: 'Entretenimiento', amount: 170, year: 2024, month: 3 },
    { category: 'Salud', amount: 320, year: 2024, month: 3 },
    { category: 'Educación', amount: 440, year: 2024, month: 3 },
    { category: 'Restaurante', amount: 240, year: 2024, month: 3 },

    { category: 'Alquiler', amount: 1150, year: 2024, month: 4 },
    { category: 'Supermercado', amount: 560, year: 2024, month: 4 },
    { category: 'Transporte', amount: 230, year: 2024, month: 4 },
    { category: 'Entretenimiento', amount: 180, year: 2024, month: 4 },
    { category: 'Salud', amount: 330, year: 2024, month: 4 },
    { category: 'Educación', amount: 460, year: 2024, month: 4 },
    { category: 'Restaurante', amount: 260, year: 2024, month: 4 },

    { category: 'Alquiler', amount: 1200, year: 2024, month: 5 },
    { category: 'Supermercado', amount: 580, year: 2024, month: 5 },
    { category: 'Transporte', amount: 240, year: 2024, month: 5 },
    { category: 'Entretenimiento', amount: 190, year: 2024, month: 5 },
    { category: 'Salud', amount: 340, year: 2024, month: 5 },
    { category: 'Educación', amount: 480, year: 2024, month: 5 },
    { category: 'Restaurante', amount: 280, year: 2024, month: 5 },

    { category: 'Alquiler', amount: 1250, year: 2024, month: 6 },
    { category: 'Supermercado', amount: 600, year: 2024, month: 6 },
    { category: 'Transporte', amount: 250, year: 2024, month: 6 },
    { category: 'Entretenimiento', amount: 200, year: 2024, month: 6 },
    { category: 'Salud', amount: 350, year: 2024, month: 6 },
    { category: 'Educación', amount: 500, year: 2024, month: 6 },
    { category: 'Restaurante', amount: 300, year: 2024, month: 6 },

    { category: 'Alquiler', amount: 1300, year: 2024, month: 7 },
    { category: 'Supermercado', amount: 620, year: 2024, month: 7 },
    { category: 'Transporte', amount: 260, year: 2024, month: 7 },
    { category: 'Entretenimiento', amount: 210, year: 2024, month: 7 },
    { category: 'Salud', amount: 360, year: 2024, month: 7 },
    { category: 'Educación', amount: 520, year: 2024, month: 7 },
    { category: 'Restaurante', amount: 320, year: 2024, month: 7 },
  ];

  constructor(private notificationsService: NotificationsService) {}

  addBudget(budget: Budget): void {
    this.budgets.push(budget);
  }

  getBudgets(): Budget[] {
    return this.budgets;
  }

  getBudgetsByMonth(year: number, month: number): Budget[] {
    return this.budgets.filter((budget) => {
      const budgetDate = new Date(budget.year, budget.month - 1);
      const targetDate = new Date(year, month - 1);
      return (
        budgetDate.getFullYear() === targetDate.getFullYear() &&
        budgetDate.getMonth() === targetDate.getMonth()
      );
    });
  }

  deleteBudget(category: string, year: number, month: number): void {
    this.budgets = this.budgets.filter(
      (b) => b.category !== category || b.year !== year || b.month !== month
    );
  }

  getBudgetByCategory(category: string, year: number, month: number): number {
    const budget = this.budgets.find(
      (b) => b.category === category && b.year === year && b.month === month
    );
    return budget ? budget.amount : 0;
  }

  checkBudgetExceed(
    category: string,
    amount: number,
    year: number,
    month: number
  ): void {
    const budget = this.getBudgetByCategory(category, year, month);
    if (amount > budget) {
      this.notificationsService.addLowBalanceAlert(
        `Se ha excedido el presupuesto para la categoría ${category} en ${month}/${year}`
      );
    }
  }
}
