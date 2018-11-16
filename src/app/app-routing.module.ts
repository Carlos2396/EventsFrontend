import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateComponent } from './components/answers/create/create.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EventsIndexComponent } from './components/events/events-index/events-index.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { EventsShowComponent } from './components/events/events-show/events-show.component';
import { AccountConfirmationComponent } from './components/auth/account-confirmation/account-confirmation.component';

const routes: Routes = [
    { path: '', component:LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirmar/:uuid', component: AccountConfirmationComponent },
    { path: 'events', component: EventsIndexComponent},
    { path: 'events/:id', component: EventsShowComponent},
    { path: 'tickets', component: TicketsListComponent},
    { path: 'registerEvent/:id', component: CreateComponent}, //Cambiar al componente completo.

    { path: '**', component: EventsIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
