import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsMessaging } from './chats-messaging';

describe('ChatsMessaging', () => {
  let component: ChatsMessaging;
  let fixture: ComponentFixture<ChatsMessaging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsMessaging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsMessaging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
