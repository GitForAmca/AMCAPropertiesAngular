import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsforsaleComponent } from './apartmentsforsale.component';

describe('ApartmentsforsaleComponent', () => {
  let component: ApartmentsforsaleComponent;
  let fixture: ComponentFixture<ApartmentsforsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsforsaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentsforsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
