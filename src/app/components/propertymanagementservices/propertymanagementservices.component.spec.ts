import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertymanagementservicesComponent } from './propertymanagementservices.component';

describe('PropertymanagementservicesComponent', () => {
  let component: PropertymanagementservicesComponent;
  let fixture: ComponentFixture<PropertymanagementservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertymanagementservicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertymanagementservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
