import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlagComponent } from './edit-flag.component';

describe('EditFlagComponent', () => {
  let component: EditFlagComponent;
  let fixture: ComponentFixture<EditFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
