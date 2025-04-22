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
export class GoalFormComponent{
  goals: Goal[] = [];
  newGoal: Goal = {
    title: '',
    target_amount: 0,
    deadline: null,
  };
  showForm = false;
  showGoalList: boolean = false;

  constructor(private goalService: GoalService) {}

  addGoal() {
    this.goalService.createGoal(this.newGoal).subscribe((goal) => {
      this.goals.push(goal);
      this.newGoal = { title: '', target_amount: 0, deadline: null };
      this.showForm = false;
    });
  }
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  seeGoal() {
    this.showGoalList = true;
  }
}
