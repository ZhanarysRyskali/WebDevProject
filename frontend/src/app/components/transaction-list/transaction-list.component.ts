import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction.model';
import { AmountPipe } from '../../pipes/amount.pipe';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AmountPipe]
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  private subscription: Subscription = new Subscription();

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  filterType: 'income' | 'expense' | '' = '';
  filterCategory: Category | '' = '';
  filterDateFrom: string = '';
  filterDateTo: string = '';
  
  // Filtered totals
  totalIncome: number = 0;
  totalExpense: number = 0;
  
  // Overall totals
  overallIncome: number = 0;
  overallExpense: number = 0;

  incomeCategories: Category[] = ['Зарплата', 'Подарок', 'Другое'];
  expenseCategories: Category[] = ['Еда', 'Транспорт', 'Развлечения', 'Другое'];

  constructor(private ts: TransactionService) {}

  ngOnInit(): void {
    this.subscription = this.ts.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        console.log('Received transactions:', data);
        this.transactions = data;
        this.calculateOverallTotals();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get availableCategories(): Category[] {
    return this.filterType === 'income' ? this.incomeCategories :
           this.filterType === 'expense' ? this.expenseCategories : [];
  }

  private parseAmount(amount: number | string): number {
    if (typeof amount === 'string') {
      return parseFloat(amount) || 0;
    }
    return amount || 0;
  }

  private calculateOverallTotals() {
    this.overallIncome = this.transactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + this.parseAmount(t.amount), 0);

    this.overallExpense = this.transactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + this.parseAmount(t.amount), 0);
  }

  applyFilters() {
    console.log('Applying filters:', {
      type: this.filterType,
      category: this.filterCategory,
      dateFrom: this.filterDateFrom,
      dateTo: this.filterDateTo
    });
    
    this.filteredTransactions = this.transactions.filter(t => {
      const matchesType = !this.filterType || t.transaction_type === this.filterType;
      const matchesCategory = !this.filterCategory || t.category === this.filterCategory;
      const matchesDateFrom = !this.filterDateFrom || new Date(t.date) >= new Date(this.filterDateFrom);
      const matchesDateTo = !this.filterDateTo || new Date(t.date) <= new Date(this.filterDateTo);
      return matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
    });
  
    console.log('Filtered transactions:', this.filteredTransactions);
    
    // Calculate filtered totals
    this.totalIncome = this.filteredTransactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + this.parseAmount(t.amount), 0);
  
    this.totalExpense = this.filteredTransactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + this.parseAmount(t.amount), 0);

    // Update pagination
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.pageSize);
    this.currentPage = 1; // Reset to first page when filters change
    this.updateDisplayedTransactions();
  }

  clearFilters() {
    this.filterType = '';
    this.filterCategory = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.applyFilters();
  }

  // Pagination methods
  updateDisplayedTransactions() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedTransactions = this.filteredTransactions.slice(start, end);
    console.log('Updated displayed transactions:', {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      displayedTransactions: this.displayedTransactions
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedTransactions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTransactions();
    }
  }

  get pages(): number[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    let pages: number[] = [];
    const currentPage = this.currentPage;
    const totalPages = this.totalPages;

    // Always include first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push(-1); // Represents ellipsis
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push(-1); // Represents ellipsis
    }

    // Always include last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedTransactions();
    }
  }
}