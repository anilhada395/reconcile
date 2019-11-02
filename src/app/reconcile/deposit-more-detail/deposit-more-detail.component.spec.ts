import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositMoreDetailComponent } from './deposit-more-detail.component';

describe('DepositMoreDetailComponent', () => {
  let component: DepositMoreDetailComponent;
  let fixture: ComponentFixture<DepositMoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositMoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
