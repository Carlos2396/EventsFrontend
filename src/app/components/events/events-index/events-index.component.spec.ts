import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsIndexComponent } from './events-index.component';
import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { Location } from "../../../models/location.model";
import { Sponsor } from "../../../models/sponsor.model";
import { HttpErrorResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service'
import { NotificationService } from '../../../services/notification.service'
import { RouterTestingModule } from '@angular/router/testing';

describe('EventsIndexComponent', () => {
  let component: EventsIndexComponent;
  let fixture: ComponentFixture<EventsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsIndexComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
