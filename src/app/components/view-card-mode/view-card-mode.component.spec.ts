import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardModeComponent } from './view-card-mode.component';

describe('ViewCardModeComponent', () => {
  let component: ViewCardModeComponent;
  let fixture: ComponentFixture<ViewCardModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
