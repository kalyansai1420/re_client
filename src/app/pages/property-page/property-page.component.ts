import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/property.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
})
export class PropertyPageComponent implements AfterViewInit {
  private routeSub!: Subscription;

  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  username: null | undefined;

  isScrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _property: PropertyService,
    private login: LoginService
  ) {}

  pId = 0;
  property: any;
  ngOnInit(): void {
    this.getUserId();
    this.routeSub = this._route.params.subscribe((params) => {
      this.pId = params['pId'];
      console.log(params['pId']); //log the value of id
    });

    this._property.getProperty(this.pId).subscribe(
      (data: any) => {
        this.property = data;
        console.log(this.property);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUpdatedText(updatedAt: string): string {
    const currentDate = new Date();
    const updatedDate = new Date(updatedAt);
    const timeDiff = Math.abs(currentDate.getTime() - updatedDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (daysDiff === 0) {
      return 'Updated just now';
    } else {
      return `Updated ${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;
    }
  }
  getUserId() {
    this.isLoggedIn = this.login.isLoggedIn();
    if (!this.isLoggedIn) {
      return null;
    } else {
      this.user = this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        this.username = this.user.username;
      });
      return this.user ? this.user.uId : null; // Add null check for user object
    }
  }

  ngAfterViewInit(): void {
 
  
  }
  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
