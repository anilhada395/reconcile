import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagMoreDetailComponent } from './flag-more-detail.component';

describe('FlagMoreDetailComponent', () => {
  let component: FlagMoreDetailComponent;
  let fixture: ComponentFixture<FlagMoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagMoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
