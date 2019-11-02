import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagOpenComponent } from './flag-open.component';

describe('FlagOpenComponent', () => {
  let component: FlagOpenComponent;
  let fixture: ComponentFixture<FlagOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
