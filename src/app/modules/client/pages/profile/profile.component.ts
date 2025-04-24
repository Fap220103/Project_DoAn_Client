import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentView: 'profile' | 'password' | 'order' = 'profile';

  constructor() {}

  ngOnInit() {}
  show(view: 'profile' | 'password' | 'order') {
    this.currentView = view;
  }
}
