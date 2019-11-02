import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciledDepositMoreDetailComponent } from './reconciled-deposit-more-detail.component';

describe('ReconciledDepositMoreDetailComponent', () => {
  let component: ReconciledDepositMoreDetailComponent;
  let fixture: ComponentFixture<ReconciledDepositMoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconciledDepositMoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciledDepositMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
