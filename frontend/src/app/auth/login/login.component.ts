import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  
  successMessage: string = '';  

  constructor(
    private authService: AuthService,  
    private router: Router, 
    private fb: FormBuilder  
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Пожалуйста, заполните все поля корректно.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.successMessage = 'Вход успешно выполнен!';
      },
      error: () => {
        this.errorMessage = 'Неверное имя пользователя или пароль.';
      }
    });
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);  
  }

  resetForm(): void {
    this.loginForm.reset();
  }
}
