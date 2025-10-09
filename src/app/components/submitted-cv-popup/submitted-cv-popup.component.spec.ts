import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedCvPopupComponent } from './submitted-cv-popup.component';

describe('SubmittedCvPopupComponent', () => {
  let component: SubmittedCvPopupComponent;
  let fixture: ComponentFixture<SubmittedCvPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedCvPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedCvPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
