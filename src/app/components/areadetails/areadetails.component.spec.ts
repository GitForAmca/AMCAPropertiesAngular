import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreadetailsComponent } from './areadetails.component';

describe('AreadetailsComponent', () => {
  let component: AreadetailsComponent;
  let fixture: ComponentFixture<AreadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreadetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
