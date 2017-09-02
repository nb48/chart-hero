import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEditorComponent } from './chart-editor.component';

describe('ChartEditorComponent', () => {
  let component: ChartEditorComponent;
  let fixture: ComponentFixture<ChartEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
