import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillasforrentComponent } from './villasforrent.component';

describe('VillasforrentComponent', () => {
  let component: VillasforrentComponent;
  let fixture: ComponentFixture<VillasforrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillasforrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillasforrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
