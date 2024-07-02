import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderReportComponent } from './shared-module/Components/order-report/order-report.component';
import { LoginComponent } from './shared-module/Components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderReportComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ITI.FinalProject.Angular';
}
