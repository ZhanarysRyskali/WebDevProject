import { Component, OnInit } from '@angular/core';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css'
})

export class GoalListComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalService.getGoals().subscribe((data: Goal[]) => {
      this.goals = data;
    });
  }
}
