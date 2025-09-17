import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureddevelopersComponent } from './featureddevelopers.component';

describe('FeatureddevelopersComponent', () => {
  let component: FeatureddevelopersComponent;
  let fixture: ComponentFixture<FeatureddevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureddevelopersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureddevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
