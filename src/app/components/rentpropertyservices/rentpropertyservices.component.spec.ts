import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentpropertyservicesComponent } from './rentpropertyservices.component';

describe('RentpropertyservicesComponent', () => {
  let component: RentpropertyservicesComponent;
  let fixture: ComponentFixture<RentpropertyservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentpropertyservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentpropertyservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
