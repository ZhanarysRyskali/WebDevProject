import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.css'
})
export class GoalFormComponent {
  @Output() goalAdded = new EventEmitter<void>();
  newGoal: Goal = {
    title: '',
    target_amount: 0,
    current_amount: 0,
    deadline: ''
  };

  constructor(private goalService: GoalService) {}

  onAmountFocus(): void {
    if (this.newGoal.target_amount === 0) {
      this.newGoal.target_amount = null as any;
    }
  }

  onAmountBlur(): void {
    if (this.newGoal.target_amount === null) {
      this.newGoal.target_amount = 0;
    }
  }

  addGoal(): void {
    this.goalService.createGoal(this.newGoal).subscribe({
      next: (goal) => {
        this.newGoal = {
          title: '',
          target_amount: 0,
          current_amount: 0,
          deadline: ''
        };
        this.goalAdded.emit();
      },
      error: (error) => {
        console.error('Error creating goal:', error);
        alert('Failed to create goal. Please try again.');
      }
    });
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}