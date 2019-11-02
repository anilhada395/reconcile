import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingBillComponent } from './outgoing-bill.component';

describe('OutgoingBillComponent', () => {
  let component: OutgoingBillComponent;
  let fixture: ComponentFixture<OutgoingBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
