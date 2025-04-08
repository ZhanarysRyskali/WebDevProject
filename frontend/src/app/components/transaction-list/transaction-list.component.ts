import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private ts: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.ts.getAll().subscribe((data) => this.transactions = data);
  }

  deleteTransaction(id: number) {
    this.ts.delete(id).subscribe(() => this.loadTransactions());
  }
}
