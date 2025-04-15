/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderClientComponent } from './header-client.component';

describe('HeaderClientComponent', () => {
  let component: HeaderClientComponent;
  let fixture: ComponentFixture<HeaderClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderClientComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
