import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsEditComponent } from './alerts-edit.component';

describe('AlertsEditComponent', () => {
  let component: AlertsEditComponent;
  let fixture: ComponentFixture<AlertsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
