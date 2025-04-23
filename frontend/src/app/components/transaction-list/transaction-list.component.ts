import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  filterType: string = '';
  filterCategory: string = '';
  filterDateFrom: string = '';
  filterDateTo: string = '';
  totalIncome: number = 0;
  totalExpense: number = 0;

  incomeCategories = ['Зарплата', 'Подарок', 'Другое'];
  expenseCategories = ['Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {}

  ngOnInit(): void {
    this.ts.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      console.log(this.transactions);
      this.applyFilters();
    });
  }

  get availableCategories(): string[] {
    return this.filterType === 'income' ? this.incomeCategories :
           this.filterType === 'expense' ? this.expenseCategories : [];
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(t => {
      const matchesType = !this.filterType || t.transaction_type === this.filterType;
      const matchesCategory = !this.filterCategory || t.category === this.filterCategory;
      const matchesDateFrom = !this.filterDateFrom || new Date(t.date) >= new Date(this.filterDateFrom);
      const matchesDateTo = !this.filterDateTo || new Date(t.date) <= new Date(this.filterDateTo);
      return matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
    });
  
    // Calculate totals
    this.totalIncome = this.filteredTransactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  
    this.totalExpense = this.filteredTransactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  clearFilters() {
    this.filterType = '';
    this.filterCategory = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.applyFilters();
  }
}