import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapInputComponent } from './tap-input.component';

describe('TapInputComponent', () => {
  let component: TapInputComponent;
  let fixture: ComponentFixture<TapInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
