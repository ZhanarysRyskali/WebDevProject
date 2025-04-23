import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TransactionFormComponent {
  @Output() transactionAdded = new EventEmitter<void>();

  transaction: Transaction = {
    transaction_type: 'income',
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
      this.transaction.amount = null as any;
    }
  }
  
  onAmountBlur() {
    if (!this.transaction.amount) {
      this.transaction.amount = 0;
    }
  }

  categories: Category[] = [];

  incomeCategories: Category[] = ['Зарплата', 'Подарок', 'Другое'];
  expenseCategories: Category[] = ['Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {
    this.updateCategories();
  }

  onTypeChange(): void {
    this.updateCategories();
    this.transaction.category = this.categories[0];
  }

  private updateCategories(): void {
    if (this.transaction.transaction_type === 'income') {
      this.categories = this.incomeCategories;
    } else {
      this.categories = this.expenseCategories;
    }
  }

  private parseAmount(amount: number | string): number {
    if (typeof amount === 'string') {
      return parseFloat(amount) || 0;
    }
    return amount || 0;
  }

  addTransaction() {
    const amountValue = this.parseAmount(this.transaction.amount);
    if (!this.transaction.date || amountValue <= 0) {
      alert('❗ Пожалуйста, заполните корректно дату и сумму');
      return;
    }
    
    this.ts.create(this.transaction).subscribe({
      next: (transaction: Transaction) => {
        console.log('Transaction created:', transaction);
        this.resetForm();
        this.transactionAdded.emit();
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
        alert('Произошла ошибка при добавлении транзакции');
      }
    });
  }

  resetForm() {
    this.transaction = {
      transaction_type: 'income',
      category: 'Зарплата',
      amount: 0,
      date: this.getTodayDate(),
      description: ''
    };
    this.updateCategories();
  }
}
