import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://127.0.0.1:8000/tracker/transactions/'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // private transactions: Transaction[] = [];
  // private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  getTransactions(): Observable<Transaction[]> {
    const token = this.authService.getToken(); 
    if (!token) {
      console.error('Token is missing');
    }
    return this.http.get<Transaction[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    });
  }
  create(transaction: Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(this.apiUrl, transaction, {
        headers: this.createHeaders(),
      });
  }
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}