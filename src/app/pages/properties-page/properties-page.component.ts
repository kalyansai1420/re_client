import { Component, HostListener, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent {
  isLoggedIn = false;
  user = null;

  propertyType!: string;
  propertyCity!: string;
  private routeSub: Subscription | undefined;
  constructor(public login: LoginService, private _route: ActivatedRoute) {}

  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.propertyType = params['propertyType'];
      this.propertyCity = params['propertyCity'];
      console.log('City ', this.propertyCity);
      console.log('Type ', this.propertyType);
    });
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
