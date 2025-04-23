import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal';  
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';  

@Injectable({
  providedIn: 'root'
})

export class GoalService {
  private apiUrl = 'http://127.0.0.1:8000/tracker/goals/'; 

  constructor(private http: HttpClient, private authService: AuthService) {}


  getGoals(): Observable<Goal[]> {
    const token = this.authService.getToken(); 
    if (!token) {
      console.error('Token is missing');
    }
    return this.http.get<Goal[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    });
  }
  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.apiUrl, goal, {
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