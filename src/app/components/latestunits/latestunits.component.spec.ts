import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestunitsComponent } from './latestunits.component';

describe('LatestunitsComponent', () => {
  let component: LatestunitsComponent;
  let fixture: ComponentFixture<LatestunitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestunitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
