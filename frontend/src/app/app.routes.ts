import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // УБИРАЕМ canActivate
  { path: 'login', component: LoginComponent },
];