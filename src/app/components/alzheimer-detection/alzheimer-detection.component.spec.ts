import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlzheimerDetectionComponent } from './alzheimer-detection.component';

describe('AlzheimerDetectionComponent', () => {
  let component: AlzheimerDetectionComponent;
  let fixture: ComponentFixture<AlzheimerDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlzheimerDetectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlzheimerDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
