import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositLogComponent } from './deposit-log.component';

describe('DepositLogComponent', () => {
  let component: DepositLogComponent;
  let fixture: ComponentFixture<DepositLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
