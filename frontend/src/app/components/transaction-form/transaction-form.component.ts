import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
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
