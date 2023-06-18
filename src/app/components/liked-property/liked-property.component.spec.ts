import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPropertyComponent } from './liked-property.component';

describe('LikedPropertyComponent', () => {
  let component: LikedPropertyComponent;
  let fixture: ComponentFixture<LikedPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedPropertyComponent]
    });
    fixture = TestBed.createComponent(LikedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
