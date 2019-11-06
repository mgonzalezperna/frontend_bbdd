/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalizadorListComponent } from './totalizador-list.component';

describe('TotalizadorListComponent', () => {
  let component: TotalizadorListComponent;
  let fixture: ComponentFixture<TotalizadorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalizadorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalizadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
