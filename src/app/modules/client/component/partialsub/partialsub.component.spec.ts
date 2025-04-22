/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartialsubComponent } from './partialsub.component';

describe('PartialsubComponent', () => {
  let component: PartialsubComponent;
  let fixture: ComponentFixture<PartialsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
