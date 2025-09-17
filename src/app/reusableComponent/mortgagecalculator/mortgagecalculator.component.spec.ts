import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagecalculatorComponent } from './mortgagecalculator.component';

describe('MortgagecalculatorComponent', () => {
  let component: MortgagecalculatorComponent;
  let fixture: ComponentFixture<MortgagecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgagecalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
