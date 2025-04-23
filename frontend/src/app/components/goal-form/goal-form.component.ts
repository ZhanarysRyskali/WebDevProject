import { Component } from '@angular/core';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from '../goal-list/goal-list.component';

@Component({
  selector: 'app-goal-form',
  imports: [FormsModule, CommonModule, GoalListComponent],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.css'
})

export class GoalFormComponent {
  newGoal: Goal = {
    title: '',
    target_amount: 0,
    deadline: null,
  };

  constructor(private goalService: GoalService) {}

  addGoal(): void {
    this.goalService.createGoal(this.newGoal).subscribe((goal: Goal) => {
      this.newGoal = { title: '', target_amount: 0, deadline: null }; 
      alert('Goal added successfully');
    });
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  }
}