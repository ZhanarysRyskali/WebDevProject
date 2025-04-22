import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:8000/api/goals/';

  constructor(private http: HttpClient) {}

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.baseUrl);
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.baseUrl, goal);
  }

}
