import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOutgoingFlagComponent } from './show-outgoing-flag.component';

describe('ShowOutgoingFlagComponent', () => {
  let component: ShowOutgoingFlagComponent;
  let fixture: ComponentFixture<ShowOutgoingFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOutgoingFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOutgoingFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
