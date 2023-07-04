import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCardComponent } from './recent-card.component';

describe('RecentCardComponent', () => {
  let component: RecentCardComponent;
  let fixture: ComponentFixture<RecentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentCardComponent]
    });
    fixture = TestBed.createComponent(RecentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
