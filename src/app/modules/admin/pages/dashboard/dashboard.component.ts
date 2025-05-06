import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  infoDashboard: any;
  constructor(private dashboardSevice: DashboardService) {}
  
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.dashboardSevice.get().subscribe((rs) => {
      this.infoDashboard = rs.content.data;   
    });
  }
}
