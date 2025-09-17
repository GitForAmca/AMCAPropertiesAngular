import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsforrentComponent } from './apartmentsforrent.component';

describe('ApartmentsforrentComponent', () => {
  let component: ApartmentsforrentComponent;
  let fixture: ComponentFixture<ApartmentsforrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsforrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentsforrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
