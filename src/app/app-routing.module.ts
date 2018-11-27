import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateComponent } from './components/answers/create/create.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EventsIndexComponent } from './components/events/events-index/events-index.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { EventsShowComponent } from './components/events/events-show/events-show.component';
import { AccountConfirmationComponent } from './components/auth/account-confirmation/account-confirmation.component';
import { PasswordResetComponent } from './components/account/password-reset/password-reset.component';
import { UserShowComponent } from './components/users/user-show/user-show.component';
import { ShowIndividualComponent } from './components/answers/show-individual/show-individual.component';
import { ShowGeneralComponent } from './components/answers/show-general/show-general.component';
import { SponsorsCreateComponent } from './components/sponsors/sponsors-create/sponsors-create.component';
import { EventsCreateComponent } from './components/events/events-create/events-create.component';

const routes: Routes = [
    { path: '', component:LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirmar/:uuid', component: AccountConfirmationComponent },
    { path: 'contraseña/reestablecer/:token', component: PasswordResetComponent },
    { path: 'events', component: EventsIndexComponent},
    { path: 'events/create', component: EventsCreateComponent},
    { path: 'events/sponsors/:eventId', component: SponsorsCreateComponent},
    { path: 'events/:id', component: EventsShowComponent},
    { path: 'events/:id/extras', component: ShowGeneralComponent},
    { path: 'events/:id/extras/:userId', component: ShowIndividualComponent},
    { path: 'tickets', component: TicketsListComponent},
    { path: 'registerEvent/:id', component: CreateComponent}, //Cambiar al componente completo.
    { path: 'profile', component: UserShowComponent},
    { path: '**', component: EventsIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
