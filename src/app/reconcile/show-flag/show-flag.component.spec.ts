import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlagComponent } from './show-flag.component';

describe('ShowFlagComponent', () => {
  let component: ShowFlagComponent;
  let fixture: ComponentFixture<ShowFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
