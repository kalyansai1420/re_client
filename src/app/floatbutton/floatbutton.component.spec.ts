import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatbuttonComponent } from './floatbutton.component';

describe('FloatbuttonComponent', () => {
  let component: FloatbuttonComponent;
  let fixture: ComponentFixture<FloatbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatbuttonComponent]
    });
    fixture = TestBed.createComponent(FloatbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
