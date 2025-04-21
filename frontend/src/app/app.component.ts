import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ only import RouterOutlet
  template: `<router-outlet></router-outlet>` // ✅ this loads routed components
})
export class AppComponent {}
