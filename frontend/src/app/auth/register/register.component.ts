import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // Сервис для аутентификации
import { Router } from '@angular/router';  // Для маршрутизации
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // Для работы с формами
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,  // Для использования компонента без модуля
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  // Модули, которые нужны
  templateUrl: './register.component.html',  // Шаблон HTML
  styleUrls: ['./register.component.css']  // Стили компонента
})
export class RegisterComponent {
  registerForm: FormGroup;  // Форма регистрации
  errorMessage: string = '';  // Сообщение об ошибке
  successMessage: string = '';  // Сообщение об успешной регистрации

  constructor(
    private authService: AuthService,  // Сервис для аутентификации
    private router: Router,  // Для маршрутизации
    private fb: FormBuilder  // Для работы с формами
  ) {
    // Создание формы с валидацией
    this.registerForm = this.fb.group({
      username: ['', Validators.required],  // Обязательно для заполнения
      email: ['', [Validators.required, Validators.email]],  // Валидация email
      password: ['', Validators.required],  // Пароль обязателен
      confirmPassword: ['', Validators.required]  // Подтверждение пароля
    });
  }

  // Метод для регистрации
  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Пожалуйста, заполните все поля корректно.';
      return;
    }

    const { username, email, password, confirmPassword } = this.registerForm.value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      this.errorMessage = 'Пароли не совпадают.';
      return;
    }

    // Вызов метода для регистрации пользователя
    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Регистрация успешна! Перенаправляем на страницу входа...';
        setTimeout(() => {
          this.router.navigate(['/login']);  // Перенаправление на страницу входа
        }, 2000);  // Задержка 2 секунды
      },
      error: () => {
        this.errorMessage = 'Ошибка при регистрации. Попробуйте снова.';
      }
    });
  }
}
