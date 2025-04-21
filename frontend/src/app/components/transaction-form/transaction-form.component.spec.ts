// src/app/components/transaction-form/transaction-form.component.ts
import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TransactionFormComponent {
getTodayDate() {
throw new Error('Method not implemented.');
}
onAmountBlur() {
throw new Error('Method not implemented.');
}
onAmountFocus() {
throw new Error('Method not implemented.');
}
onTypeChange() {
throw new Error('Method not implemented.');
}
  transaction: Transaction = {
    type: 'income',
    category: 'Зарплата',
    amount: 0,
    date: '',
    description: ''
  };

  categories: string[] = ['Зарплата', 'Подарок', 'Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {}

  onSubmit() {
    if (!this.transaction.date || this.transaction.amount <= 0) {
      alert('❗ Пожалуйста, заполните корректно дату и сумму');
      return;
    }

    this.ts.create(this.transaction);
    alert('✅ Транзакция добавлена!');
    this.resetForm();
  }

  resetForm() {
    this.transaction = {
      type: 'income',
      category: 'Зарплата',
      amount: 0,
      date: '',
      description: ''
    };
  }
}
