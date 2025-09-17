import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeshortsComponent } from './youtubeshorts.component';

describe('YoutubeshortsComponent', () => {
  let component: YoutubeshortsComponent;
  let fixture: ComponentFixture<YoutubeshortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeshortsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeshortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
