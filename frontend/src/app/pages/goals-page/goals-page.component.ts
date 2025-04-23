import { Component, ViewChild } from '@angular/core';
import { GoalFormComponent } from '../../components/goal-form/goal-form.component';
import { GoalListComponent } from '../../components/goal-list/goal-list.component';

@Component({
  selector: 'app-goals-page',
  imports: [GoalFormComponent, GoalListComponent],
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.css'
})
export class GoalsPageComponent {
  @ViewChild(GoalListComponent) goalListComponent!: GoalListComponent;

  onGoalAdded(): void {
    this.goalListComponent.loadGoals();
  }
}
