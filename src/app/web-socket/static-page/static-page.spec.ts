import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPage } from './static-page';

describe('StaticPage', () => {
  let component: StaticPage;
  let fixture: ComponentFixture<StaticPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
