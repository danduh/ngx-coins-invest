import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInvestmentsComponent } from './portfolio-invetments.component';

describe('PortfolioInvestmentsComponent', () => {
  let component: PortfolioInvestmentsComponent;
  let fixture: ComponentFixture<PortfolioInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
