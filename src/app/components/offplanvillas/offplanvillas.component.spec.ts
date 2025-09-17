import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffplanvillasComponent } from './offplanvillas.component';

describe('OffplanvillasComponent', () => {
  let component: OffplanvillasComponent;
  let fixture: ComponentFixture<OffplanvillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffplanvillasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffplanvillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
