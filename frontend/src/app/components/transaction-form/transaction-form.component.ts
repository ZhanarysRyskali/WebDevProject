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

  categories: string[] = [];

  incomeCategories: string[] = ['Зарплата', 'Подарок', 'Другое'];
  expenseCategories: string[] = ['Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {
    this.updateCategories(); 
  }

  onTypeChange(): void {
    this.updateCategories();
  }

  private updateCategories(): void {
    if (this.transaction.transaction_type === 'income') {
      this.categories = this.incomeCategories;
    } else {
      this.categories = this.expenseCategories;
    }
  }

  addTransaction() {
    
    alert('onSubmit called')
    console.log('onSubmit called');
    if (!this.transaction.date || this.transaction.amount <= 0) {
      alert('❗ Пожалуйста, заполните корректно дату и сумму');
      return;
    }
    
    this.ts.create(this.transaction).subscribe((transaction: Transaction) => {
      console.log(this.transaction);
      this.resetForm();  
      alert('Transaction added successfully');
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
