import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEditComponent } from './events-edit.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EventsEditComponent', () => {
  let component: EventsEditComponent;
  let fixture: ComponentFixture<EventsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsEditComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
          HttpClient,
          HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
