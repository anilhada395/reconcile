import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedComponent } from './flagged.component';

describe('FlaggedComponent', () => {
  let component: FlaggedComponent;
  let fixture: ComponentFixture<FlaggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
