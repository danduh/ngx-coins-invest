import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInvestComponent } from './footer-invest.component';

describe('FooterInvestComponent', () => {
  let component: FooterInvestComponent;
  let fixture: ComponentFixture<FooterInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
