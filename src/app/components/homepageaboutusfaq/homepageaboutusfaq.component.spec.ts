import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageaboutusfaqComponent } from './homepageaboutusfaq.component';

describe('HomepageaboutusfaqComponent', () => {
  let component: HomepageaboutusfaqComponent;
  let fixture: ComponentFixture<HomepageaboutusfaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageaboutusfaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageaboutusfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
