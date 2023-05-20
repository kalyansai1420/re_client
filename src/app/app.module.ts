import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddPropertyComponent } from './pages/admin/add-property/add-property.component';
import { MatCardModule } from '@angular/material/card';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SuperadminDashboardComponent } from './pages/superadmin/superadmin-dashboard/superadmin-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { FeatureComponent } from './components/feature/feature.component';
import { PropertyTypeComponent } from './components/property-type/property-type.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { BestDealComponent } from './components/best-deal/best-deal.component';
import { PropertyCardComponent } from './components/feature/property-card/property-card.component';
import { TypeCardComponent } from './components/property-type/type-card/type-card.component';
import { DisCardComponent } from './components/discover/dis-card/dis-card.component';
import { DealCardComponent } from './components/best-deal/deal-card/deal-card.component';
import { HeroComponent } from './components/hero/hero.component';
import { MatChipsModule } from '@angular/material/chips';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddPropertyComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    SuperadminDashboardComponent,
    SidebarComponent,
    WelcomeComponent,
    ProfileComponent,
    NavComponent,
    FeatureComponent,
    PropertyTypeComponent,
    DiscoverComponent,
    BestDealComponent,
    PropertyCardComponent,
    TypeCardComponent,
    DisCardComponent,
    DealCardComponent,
    HeroComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
