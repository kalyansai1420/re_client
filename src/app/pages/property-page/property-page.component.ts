import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
})
export class PropertyPageComponent {
  private routeSub!: Subscription;

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
    private _property: PropertyService
  ) {}

  pId = 0;
  property: any;
  ngOnInit(): void {
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
