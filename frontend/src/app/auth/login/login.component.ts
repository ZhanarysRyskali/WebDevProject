import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
})



export class LoginComponent {
  
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  onLogin() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        window.location.href = '/';
      },
      error: () => alert('Login failed')
    });
  }
}
