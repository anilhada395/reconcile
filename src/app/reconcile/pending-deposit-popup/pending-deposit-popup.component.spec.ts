import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDepositPopupComponent } from './pending-deposit-popup.component';

describe('PendingDepositPopupComponent', () => {
  let component: PendingDepositPopupComponent;
  let fixture: ComponentFixture<PendingDepositPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDepositPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDepositPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
