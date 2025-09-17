import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenthouseforsaleComponent } from './penthouseforsale.component';

describe('PenthouseforsaleComponent', () => {
  let component: PenthouseforsaleComponent;
  let fixture: ComponentFixture<PenthouseforsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenthouseforsaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenthouseforsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
