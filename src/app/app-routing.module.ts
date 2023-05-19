import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SuperadminDashboardComponent } from './pages/superadmin/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminGuard } from './services/superadmin.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AddPropertyComponent } from './pages/admin/add-property/add-property.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'add-property',
        component:AddPropertyComponent
      }
     
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
  },
  {
    path: 'superadmin',
    component: SuperadminDashboardComponent,
    canActivate: [SuperadminGuard],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
