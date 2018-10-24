import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CreateComponent } from './create.component';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Extra } from 'src/app/models/extra.model';
import { Event } from 'src/app/models/event.model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        AuthService,
        NotificationService,
        APIService,
        HttpClient,
        HttpHandler
      ],
      declarations: [ CreateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        AuthService,
        NotificationService,
        APIService,
        HttpClient,
        HttpHandler
      ],
      declarations: [ CreateComponent
      ]
    });

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
