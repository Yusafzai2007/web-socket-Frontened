import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessges } from './send-messges';

describe('SendMessges', () => {
  let component: SendMessges;
  let fixture: ComponentFixture<SendMessges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
