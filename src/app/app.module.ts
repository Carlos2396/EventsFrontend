import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    NotificationTestingComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
