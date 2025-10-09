import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCvFormComponent } from './career-cv-form.component';

describe('CareerCvFormComponent', () => {
  let component: CareerCvFormComponent;
  let fixture: ComponentFixture<CareerCvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerCvFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
