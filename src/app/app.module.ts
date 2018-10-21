import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationTestingComponent } from './components/notification-testing/notification-testing.component';
import { FormsModule } from '@angular/forms';
import { RetrieveComponent } from './components/extras/retrieve/retrieve.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotificationTestingComponent,
    RetrieveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    APIService,
    AuthService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
