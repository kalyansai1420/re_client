import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePropertiesComponent } from './more-properties.component';

describe('MorePropertiesComponent', () => {
  let component: MorePropertiesComponent;
  let fixture: ComponentFixture<MorePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorePropertiesComponent]
    });
    fixture = TestBed.createComponent(MorePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
