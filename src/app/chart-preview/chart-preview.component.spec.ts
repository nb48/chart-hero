import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPreviewComponent } from './chart-preview.component';

describe('ChartPreviewComponent', () => {
  let component: ChartPreviewComponent;
  let fixture: ComponentFixture<ChartPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
