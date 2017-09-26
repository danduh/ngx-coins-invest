import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtfoliosComponent } from './protfolios.component';

describe('ProtfoliosComponent', () => {
  let component: ProtfoliosComponent;
  let fixture: ComponentFixture<ProtfoliosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtfoliosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
