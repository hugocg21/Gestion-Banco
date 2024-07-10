import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

export interface Budget {
  category: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets: Budget[] = [
    { category: 'Alquiler', amount: 1000 },
    { category: 'Supermercado', amount: 500 },
    { category: 'Transporte', amount: 200 },
    { category: 'Entretenimiento', amount: 150 },
    { category: 'Salud', amount: 300 },
    { category: 'Educación', amount: 400 },
    { category: 'Restaurante', amount: 200 },
    // Añadir más presupuestos de prueba aquí
  ];

  constructor(private notificationsService: NotificationsService) { }

  addBudget(budget: Budget): void {
    this.budgets.push(budget);
  }

  getBudgets(): Budget[] {
    return this.budgets;
  }

  deleteBudget(category: string): void {
    this.budgets = this.budgets.filter(b => b.category !== category);
  }

  getBudgetByCategory(category: string): number {
    const budget = this.budgets.find(b => b.category === category);
    return budget ? budget.amount : 0;
  }

  checkBudgetExceed(category: string, amount: number): void {
    const budget = this.getBudgetByCategory(category);
    if (amount > budget) {
      this.notificationsService.addLowBalanceAlert(`Se ha excedido el presupuesto para la categoría ${category}`);
    }
  }
}
