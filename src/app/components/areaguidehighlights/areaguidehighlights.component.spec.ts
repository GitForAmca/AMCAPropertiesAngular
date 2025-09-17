import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaguidehighlightsComponent } from './areaguidehighlights.component';

describe('AreaguidehighlightsComponent', () => {
  let component: AreaguidehighlightsComponent;
  let fixture: ComponentFixture<AreaguidehighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaguidehighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaguidehighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
