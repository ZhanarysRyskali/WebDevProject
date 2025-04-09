import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  create(transaction: Transaction): void {
    // добавляем с ID
    const newTransaction = { ...transaction, id: Date.now() };
    this.transactions.unshift(newTransaction);
    this.transactionsSubject.next(this.transactions);
  }
}