import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private _route: ActivatedRoute
  ) {}

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
}
