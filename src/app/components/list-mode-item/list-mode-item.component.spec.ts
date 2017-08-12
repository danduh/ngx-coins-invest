import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeItemComponent } from './list-mode-item.component';

describe('ListModeItemComponent', () => {
  let component: ListModeItemComponent;
  let fixture: ComponentFixture<ListModeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
