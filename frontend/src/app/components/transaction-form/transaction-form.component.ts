import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
})
export class TransactionFormComponent {
  transaction: Transaction = {
    type: 'income',
    category: '',
    amount: 0,
    date: '',
    description: ''
  };

  constructor(private ts: TransactionService) {}

  onSubmit() {
    this.ts.create(this.transaction).subscribe(() => {
      alert('Transaction added');
      window.location.reload(); // for simplicity
    });
  }
}
