import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisCardComponent } from './dis-card.component';

describe('DisCardComponent', () => {
  let component: DisCardComponent;
  let fixture: ComponentFixture<DisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
