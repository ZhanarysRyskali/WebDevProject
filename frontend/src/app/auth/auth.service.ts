import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:8000/api';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(username: string, password: string): Observable<any> {
//     const body = { username, password };
//     return this.http.post('/api/token/', body);
//   }
  
//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   setToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn() {
//     return !!this.getToken();
//   }
// }
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';  // базовый адрес

  constructor(private http: HttpClient) {}

  // 🔐 Логин
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { username, password });
  }

  // 🆕 Регистрация
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, { username, email, password });
  }

  // 🚪 Выход
  logout(): void {
    localStorage.removeItem('token');
  }

  // ✅ Проверка авторизации
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
