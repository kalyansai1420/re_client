import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedListComponent } from './interested-list.component';

describe('InterestedListComponent', () => {
  let component: InterestedListComponent;
  let fixture: ComponentFixture<InterestedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestedListComponent]
    });
    fixture = TestBed.createComponent(InterestedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
