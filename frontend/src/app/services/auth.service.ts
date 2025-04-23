import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
  setToken(token: string, refresh: string) {
    localStorage.setItem('access', token);
    localStorage.setItem('refresh', refresh);
  }
  getToken(): string | null {
    return localStorage.getItem('access_token'); 
  }
  private api = 'http://localhost:8000/tracker';

  private accessToken$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(`${this.api}/api/token/`, {
      email, password
    }).pipe(
      tap(res => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.accessToken$.next(res.access);
      })
    );
  }

  register(email: string, password: string) {
    return this.http.post(`${this.api}/api/register/`, { email, password });
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh');
    return this.http.post<{ access: string }>(`${this.api}/api/token/refresh/`, { refresh })
      .pipe(tap(res => {
        localStorage.setItem('access', res.access);
        this.accessToken$.next(res.access);
      }));
  }

  getAccessToken() {
    return localStorage.getItem('access');
  }
}
