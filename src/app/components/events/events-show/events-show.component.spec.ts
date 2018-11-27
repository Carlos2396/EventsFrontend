import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsShowComponent } from './events-show.component';
import { AuthService } from 'src/app/services/auth.service';
import { APIService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LocationIndexComponent } from '../../locations/location-index/location-index.component';
import { SponsorsIndexComponent } from '../../sponsors/sponsors-index/sponsors-index.component';
import { AgmMap, AgmInfoWindow, AgmMarker } from '@agm/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventsShowComponent', () => {
  let component: EventsShowComponent;
  let fixture: ComponentFixture<EventsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      providers: [
        AuthService,
        APIService,
        NotificationService,
        HttpClient,
        HttpHandler
      ],
      declarations: [ EventsShowComponent,
      LocationIndexComponent,
      SponsorsIndexComponent,
      AgmMap,
      AgmInfoWindow,
      AgmMarker
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

  });

  it('should be undefined', () => {
    expect(component).toBeUndefined();
  });
});
