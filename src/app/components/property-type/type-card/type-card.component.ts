import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.css'],
})
export class TypeCardComponent {
  countByTypeArray: any[] = [];
  constructor(
    private _property: PropertyService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}
  getPropertyImage(propertyType: string): string {
    switch (propertyType) {
      case 'flat':
        return '4';
      case 'villa':
        return '2';
      case 'Open Plots':
        return '3';
      case 'Apartments':
        return '1';
      default:
        return '1'; // If the property type doesn't match any case, you can provide a default image or an empty string.
    }
  }
  ngOnInit(): void {
    this._property.countPropertiesByType().subscribe(
      (data: any) => {
        this.countByTypeArray = data;
        console.log(this.countByTypeArray);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  redirectToPropertyType(propertyType: string) {
    const url = '/propertyType' + propertyType;
    this.router.navigateByUrl(url);
  }
}
