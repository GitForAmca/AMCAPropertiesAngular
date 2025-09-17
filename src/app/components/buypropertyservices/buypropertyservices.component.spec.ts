import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypropertyservicesComponent } from './buypropertyservices.component';

describe('BuypropertyservicesComponent', () => {
  let component: BuypropertyservicesComponent;
  let fixture: ComponentFixture<BuypropertyservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuypropertyservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuypropertyservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
