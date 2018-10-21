import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EventsIndexComponent } from './events/events-index/events-index.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EventsIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    APIService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
