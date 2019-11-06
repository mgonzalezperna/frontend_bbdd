/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FirendlistComponent } from './firendlist.component';

describe('FirendlistComponent', () => {
  let component: FirendlistComponent;
  let fixture: ComponentFixture<FirendlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirendlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirendlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
