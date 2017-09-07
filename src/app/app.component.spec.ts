import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('Component: App', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        });
    });

    it('AppComponent should compile', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});

