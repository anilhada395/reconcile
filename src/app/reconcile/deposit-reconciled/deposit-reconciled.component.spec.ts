import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositReconciledComponent } from './deposit-reconciled.component';

describe('DepositReconciledComponent', () => {
  let component: DepositReconciledComponent;
  let fixture: ComponentFixture<DepositReconciledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositReconciledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositReconciledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
