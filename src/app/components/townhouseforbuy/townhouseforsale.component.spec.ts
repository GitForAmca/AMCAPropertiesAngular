import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownhouseforsaleComponent } from './townhouseforsale.component';

describe('TownhouseforsaleComponent', () => {
  let component: TownhouseforsaleComponent;
  let fixture: ComponentFixture<TownhouseforsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TownhouseforsaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownhouseforsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
