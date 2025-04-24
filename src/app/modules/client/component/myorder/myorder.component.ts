import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyOrderComponent implements OnInit {
  lstOrder: any[] = [];
  constructor() {}

  ngOnInit() {}
}
