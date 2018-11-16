import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationTestingComponent } from './components/notification-testing/notification-testing.component';
import { EventsIndexComponent } from './components/events/events-index/events-index.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './components/answers/create/create.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { SponsorsIndexComponent } from './components/sponsors/sponsors-index/sponsors-index.component';
import { LocationIndexComponent } from './components/locations/location-index/location-index.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { EventsShowComponent } from './components/events/events-show/events-show.component';
import { AccountConfirmationComponent } from './components/auth/account-confirmation/account-confirmation.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EventsIndexComponent,
    LoginComponent,
    NotificationTestingComponent,
    CreateComponent,
    RegisterComponent,
    TicketsListComponent,
    SponsorsIndexComponent,
    LocationIndexComponent,
    EventsShowComponent,
    AccountConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBIuKYKKyElbSMI74Thrh9zaK8BPAyHs1M'}),
  ],
  providers: [
    APIService,
    AuthService,
    NotificationService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
