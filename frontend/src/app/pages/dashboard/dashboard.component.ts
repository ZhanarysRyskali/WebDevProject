import { Component } from '@angular/core';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TransactionFormComponent, TransactionListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) {}

  onToGoals() {
    this.router.navigate(['/goals']);
  }

  onLogout() {
    this.auth.logout();             
    this.router.navigate(['/login']); 
  }
}
