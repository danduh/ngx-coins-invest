import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListModeComponent } from './view-list-mode.component';

describe('ViewListModeComponent', () => {
  let component: ViewListModeComponent;
  let fixture: ComponentFixture<ViewListModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
