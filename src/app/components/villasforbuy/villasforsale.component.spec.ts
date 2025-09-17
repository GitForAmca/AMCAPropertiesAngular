import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillasforsaleComponent } from './villasforsale.component';

describe('VillasforsaleComponent', () => {
  let component: VillasforsaleComponent;
  let fixture: ComponentFixture<VillasforsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillasforsaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillasforsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
