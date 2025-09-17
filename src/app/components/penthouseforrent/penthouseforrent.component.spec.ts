import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenthouseforrentComponent } from './penthouseforrent.component';

describe('PenthouseforrentComponent', () => {
  let component: PenthouseforrentComponent;
  let fixture: ComponentFixture<PenthouseforrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenthouseforrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenthouseforrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
