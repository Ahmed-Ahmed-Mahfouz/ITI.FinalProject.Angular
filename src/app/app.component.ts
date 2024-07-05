import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderReportComponent } from './shared-module/Components/order-report/order-report.component';
import { HomeComponent } from "./shared-module/Components/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet, OrderReportComponent, HomeComponent]
})
export class AppComponent {
  title = 'ITI.FinalProject.Angular';
}
