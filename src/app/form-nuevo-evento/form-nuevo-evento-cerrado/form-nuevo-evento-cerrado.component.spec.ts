/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNuevoEventoCerradoComponent } from './form-nuevo-evento-cerrado.component';

describe('FormNuevoEventoCerradoComponent', () => {
  let component: FormNuevoEventoCerradoComponent;
  let fixture: ComponentFixture<FormNuevoEventoCerradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNuevoEventoCerradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNuevoEventoCerradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
