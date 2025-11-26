import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpMethod } from './otp-method';

describe('OtpMethod', () => {
  let component: OtpMethod;
  let fixture: ComponentFixture<OtpMethod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpMethod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpMethod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
