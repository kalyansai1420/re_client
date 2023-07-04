import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighbourComponent } from './neighbour.component';

describe('NeighbourComponent', () => {
  let component: NeighbourComponent;
  let fixture: ComponentFixture<NeighbourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeighbourComponent]
    });
    fixture = TestBed.createComponent(NeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
