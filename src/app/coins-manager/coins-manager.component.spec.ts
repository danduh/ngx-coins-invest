import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsManagerComponent } from './coins-manager.component';

describe('CoinsManagerComponent', () => {
  let component: CoinsManagerComponent;
  let fixture: ComponentFixture<CoinsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
