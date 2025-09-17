import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownhouseforrentComponent } from './townhouseforrent.component';

describe('TownhouseforrentComponent', () => {
  let component: TownhouseforrentComponent;
  let fixture: ComponentFixture<TownhouseforrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TownhouseforrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownhouseforrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
