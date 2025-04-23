import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = '/tracker/categories/'; // URL для получения категорий

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}