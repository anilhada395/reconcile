import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagCloseComponent } from './flag-close.component';

describe('FlagCloseComponent', () => {
  let component: FlagCloseComponent;
  let fixture: ComponentFixture<FlagCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
