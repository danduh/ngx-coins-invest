import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphInCardComponent } from './graph-in-card.component';

describe('GraphInCardComponent', () => {
  let component: GraphInCardComponent;
  let fixture: ComponentFixture<GraphInCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphInCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
