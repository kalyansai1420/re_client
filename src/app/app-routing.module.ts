import { Component, NgModule } from '@angular/core';
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
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { SaWelcomeComponent } from './pages/superadmin/sa-welcome/sa-welcome.component';
import { SaProfileComponent } from './pages/superadmin/sa-profile/sa-profile.component';
import { UserListComponent } from './pages/superadmin/user-list/user-list.component';
import { PropertyListComponent } from './pages/superadmin/property-list/property-list.component';
import { SaUpdatePropertyComponent } from './pages/superadmin/sa-update-property/sa-update-property.component';
import { InterestedListComponent } from './pages/superadmin/interested-list/interested-list.component';
import { SaUpdateUserComponent } from './pages/superadmin/sa-update-user/sa-update-user.component';
import { FeatureComponent } from './components/feature/feature.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';

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
        component: SaWelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'add-property',
        component: AddPropertyComponent,
      },
      {
        path: 'properties',
        component: PropertyListComponent,
      },
      {
        path: 'properties/:pId',
        component: SaUpdatePropertyComponent,
      },
      {
        path: 'properties/property/:pId',
        component: PropertyPageComponent,
      },
      {
        path: 'interestedProperties',
        component: InterestedListComponent,
      },
      {
        path: ':uId',
        component: SaUpdateUserComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'interested',
        component: InterestedListComponent,
      },
    ],
  },
  {
    path: 'superadmin',
    component: SuperadminDashboardComponent,
    canActivate: [SuperadminGuard],
    children: [
      {
        path: '',
        component: SaWelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/:uId',
        component: SaUpdateUserComponent,
      },
      {
        path: 'admins',
        component: UserListComponent,
      },
      {
        path: 'admins/:uId',
        component: SaUpdateUserComponent,
      },
      {
        path: 'superadmins',
        component: UserListComponent,
      },
      {
        path: 'superadmins/:uId',
        component: SaUpdateUserComponent,
      },
      {
        path: 'interestedProperties',
        component: InterestedListComponent,
      },
      {
        path: 'properties',
        component: PropertyListComponent,
      },
      {
        path: 'properties/:pId',
        component: SaUpdatePropertyComponent,
      },
      {
        path: 'properties/property/:pId',
        component: PropertyPageComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'property/:pId',
    component: PropertyPageComponent,
  },
  {
    path: 'properties',
    component:PropertiesPageComponent,
  },
  {
    path: 'propertyType/:propertyType',
    component: PropertiesPageComponent,
  },
  {
    path: 'propertyCity/:city',
    component: PropertiesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
