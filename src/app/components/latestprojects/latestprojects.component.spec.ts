import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestprojectsComponent } from './latestprojects.component';

describe('LatestprojectsComponent', () => {
  let component: LatestprojectsComponent;
  let fixture: ComponentFixture<LatestprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestprojectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
