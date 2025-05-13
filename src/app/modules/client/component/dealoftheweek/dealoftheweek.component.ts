import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealoftheweek',
  templateUrl: './dealoftheweek.component.html',
  styleUrls: ['./dealoftheweek.component.scss']
})
export class DealOfTheWeekComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private targetDate: Date = new Date();
  private interval: any;

  ngOnInit(): void {
    // Thiết lập thời gian kết thúc (ví dụ: 3 ngày sau)
    this.targetDate.setDate(this.targetDate.getDate() + 3);
    this.updateTimer();
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      clearInterval(this.interval);
      this.days = this.hours = this.minutes = this.seconds = 0;
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
