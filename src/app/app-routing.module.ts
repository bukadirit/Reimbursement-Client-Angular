import { AdminAuthGuard as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'view-ticket',
    component: ViewTicketComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }, 
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
