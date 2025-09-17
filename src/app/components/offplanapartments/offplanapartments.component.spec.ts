import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffplanapartmentsComponent } from './offplanapartments.component';

describe('OffplanapartmentsComponent', () => {
  let component: OffplanapartmentsComponent;
  let fixture: ComponentFixture<OffplanapartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffplanapartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffplanapartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
