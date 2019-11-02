import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciledPopupComponent } from './reconciled-popup.component';

describe('ReconciledPopupComponent', () => {
  let component: ReconciledPopupComponent;
  let fixture: ComponentFixture<ReconciledPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconciledPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciledPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
