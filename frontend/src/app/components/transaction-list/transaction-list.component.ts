import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule, FormsModule]
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private ts: TransactionService) {}

  ngOnInit(): void {
    this.ts.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }
}
