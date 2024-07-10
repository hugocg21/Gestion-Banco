import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionsService, Transaction } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  transaction: Transaction = {
    id: 0,
    type: 'income',
    category: '',
    amount: 0,
    date: new Date(),
    description: ''
  };

  constructor(private transactionsService: TransactionsService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.transactionsService.addTransaction(this.transaction);
      form.resetForm();
      this.transaction = {
        id: 0,
        type: 'income',
        category: '',
        amount: 0,
        date: new Date(),
        description: ''
      };
    }
  }
}
