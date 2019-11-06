import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadosPorMiComponent } from './organizados-por-mi.component';

describe('OrganizadosPorMiComponent', () => {
  let component: OrganizadosPorMiComponent;
  let fixture: ComponentFixture<OrganizadosPorMiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizadosPorMiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadosPorMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
