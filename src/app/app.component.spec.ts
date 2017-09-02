import { TestBed, async } from '@angular/core/testing';
import { MdButtonModule, MdListModule, MdSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ChartEditorComponent } from './chart-editor/chart-editor.component';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';
import { HomeComponent } from './home/home.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TapInputComponent } from './tap-input/tap-input.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChartEditorComponent,
        ChartPreviewComponent,
        HomeComponent,
        MetadataComponent,
        TapInputComponent
      ],
      imports: [
        MdButtonModule,
        MdListModule,
        MdSidenavModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Chart Hero');
  }));
});
