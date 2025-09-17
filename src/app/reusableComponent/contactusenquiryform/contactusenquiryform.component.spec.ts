import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusenquiryformComponent } from './contactusenquiryform.component';

describe('ContactusenquiryformComponent', () => {
  let component: ContactusenquiryformComponent;
  let fixture: ComponentFixture<ContactusenquiryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusenquiryformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusenquiryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
