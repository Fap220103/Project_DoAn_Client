/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterClientComponent } from './footer-client.component';

describe('FooterClientComponent', () => {
  let component: FooterClientComponent;
  let fixture: ComponentFixture<FooterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
