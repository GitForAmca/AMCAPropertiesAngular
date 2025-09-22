import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffplanlatestprojctsComponent } from './offplanlatestprojcts.component';

describe('OffplanlatestprojctsComponent', () => {
  let component: OffplanlatestprojctsComponent;
  let fixture: ComponentFixture<OffplanlatestprojctsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({    
      imports: [OffplanlatestprojctsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffplanlatestprojctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
