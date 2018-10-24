import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTestingComponent } from './notification-testing.component';

describe('NotificationTestingComponent', () => {
  let component: NotificationTestingComponent;
  let fixture: ComponentFixture<NotificationTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
