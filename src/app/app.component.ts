import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrderReportComponent } from './shared-module/Components/order-report/order-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderReportComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ITI.FinalProject.Angular';
}
