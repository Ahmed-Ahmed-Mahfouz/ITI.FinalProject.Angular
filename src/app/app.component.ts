import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OrderReportComponent } from './shared-module/Components/order-report/order-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderReportComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ITI.FinalProject.Angular';
  
  currentUrl: string;

  constructor(private route: ActivatedRoute, private router:Router) {
    this.currentUrl = ''
  }

  ngOnInit() {
    // this.route.url.subscribe(url => {
    //   this.currentUrl = url.join('/');
    //   console.log(url);
    // });
    // this.currentUrl = this.router.url;
    // console.log(this.currentUrl);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        console.log(this.currentUrl);
      }
    });
    
  }

  ngOnDestroy(): void {
    
  }

}
