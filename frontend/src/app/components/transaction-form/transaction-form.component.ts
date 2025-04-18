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
  transaction: Transaction = {
    type: 'income',
    category: 'Зарплата',
    amount: 0,
    date: this.getTodayDate(),
    description: ''
  };

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onAmountFocus() {
    if (this.transaction.amount === 0) {
      this.transaction.amount = null as any; // Clear field visually
    }
  }
  
  onAmountBlur() {
    if (!this.transaction.amount) {
      this.transaction.amount = 0;
    }
  }

  categories: string[] = [];

  incomeCategories: string[] = ['Зарплата', 'Подарок', 'Другое'];
  expenseCategories: string[] = ['Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {
    this.updateCategories();  // Initialize categories based on the initial type
  }

  // Method to update categories based on the selected type
  onTypeChange(): void {
    this.updateCategories();
  }

  private updateCategories(): void {
    if (this.transaction.type === 'income') {
      this.categories = this.incomeCategories;
    } else {
      this.categories = this.expenseCategories;
    }
  }

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
      date: this.getTodayDate(),
      description: ''
    };
    this.updateCategories();  // Reset categories when the form is reset
  }
}