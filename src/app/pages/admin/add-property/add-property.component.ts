import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {


  constructor(private formBuilder: FormBuilder) {}



  ngOnInit(): void {}

  amentities = this.formBuilder.group({
    
  })

  addProperty() {}
}
