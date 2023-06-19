import { Component, Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

interface Property {
  pId: number;
  likes: number;
  pBHK: string;
  aCity: string;
  pArea: string;
  aLandmark: string;
  images: { id: number; imageUrl: string }[];
}

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.css']
})
export class DealCardComponent {
  properties: Property[] = [];

  constructor(private _property: PropertyService) {}

  ngOnInit(): void {
    this.getMostLikedProperties();
  }

  getMostLikedProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.properties.sort((a, b) => b.likes - a.likes);
        this.properties = this.properties.slice(0, 4); // Return only the first 4 most liked properties
        console.log('Most Liked Properties:', this.properties);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
