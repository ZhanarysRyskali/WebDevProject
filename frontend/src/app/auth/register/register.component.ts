import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  registerForm: FormGroup;  
  errorMessage: string = ''; 
  successMessage: string = '';  

  constructor(
    private authService: AuthService,  
    private router: Router,  
    private fb: FormBuilder  
  ) {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required],  
      confirmPassword: ['', Validators.required] 
    });
  }

  register(): void {
    this.registerForm.markAllAsTouched(); 
    if (this.registerForm.invalid) {
      this.errorMessage = 'Пожалуйста, заполните все поля корректно.';
      return;
    }
    const { username, email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Пароли не совпадают.';
      return;
    }
  
    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Регистрация успешно выполнена!';
      },
      error: () => {
        this.errorMessage = 'Ошибка при регистрации. Попробуйте снова.';
      }
    });
  }
  
  resetForm(): void {
    this.registerForm.reset();
  }
  
}