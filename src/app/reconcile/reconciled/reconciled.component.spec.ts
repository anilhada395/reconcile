import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciledComponent } from './reconciled.component';

describe('ReconciledComponent', () => {
  let component: ReconciledComponent;
  let fixture: ComponentFixture<ReconciledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconciledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
