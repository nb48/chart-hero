import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent } from './audio-player-controls.component';
import { AudioPlayerService } from '../audio-player/audio-player.service';

describe('Component: AudioPlayerControlsComponent', () => {

    let fixture: ComponentFixture<AudioPlayerControlsComponent>;
    let service: AudioPlayerService;

    const buttonElement = (n: number): DebugElement => {
        return fixture.debugElement.queryAll(By.css('.audio-player-controls button'))[n];
    };
    const currentTimeElement = (): DebugElement => {
        return fixture.debugElement.query(By.css('.audio-player-controls input'));
    };

    const setupTest = (audioPlayer: MockAudioPlayerService) => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MdButtonModule,
                MdFormFieldModule,
                MdInputModule,
                ReactiveFormsModule,
            ],
            declarations: [
                AudioPlayerControlsComponent,
            ],
            providers: [
                { provide: AudioPlayerService, useValue: audioPlayer },
            ],
        });
        fixture = TestBed.createComponent(AudioPlayerControlsComponent);
        fixture.detectChanges();
        service = TestBed.get(AudioPlayerService);
    };

    it('AudioPlayerControls should be disabled when audio player has not loaded', () => {
        setupTest(new MockAudioPlayerService(false, '', false));
        const target = 'ng-reflect-disabled="true"';
        expect(buttonElement(0).nativeElement.outerHTML).toContain(target);
        expect(buttonElement(1).nativeElement.outerHTML).toContain(target);
        expect(currentTimeElement().nativeElement.outerHTML).toContain(target);
    });

    it('AudioPlayerControls should display play and stop button when not playing', () => {
        setupTest(new MockAudioPlayerService(true, '', false));
        expect(buttonElement(0).nativeElement.outerHTML).toContain('fa-play');
        expect(buttonElement(1).nativeElement.outerHTML).toContain('fa-stop');
    });

    it('AudioPlayerControls should display pause and stop button when not playing', () => {
        setupTest(new MockAudioPlayerService(true, '', true));
        expect(buttonElement(0).nativeElement.outerHTML).toContain('fa-pause');
        expect(buttonElement(1).nativeElement.outerHTML).toContain('fa-stop');
    });

    it('AudioPlayerControls should play when play button is clicked', () => {
        setupTest(new MockAudioPlayerService(true, '', false));
        expect((service as any).played).toEqual(false);
        buttonElement(0).nativeElement.click();
        expect((service as any).played).toEqual(true);
    });

    it('AudioPlayerControls should stop when stop button is clicked', () => {
        setupTest(new MockAudioPlayerService(true, '', false));
        expect((service as any).stopped).toEqual(false);
        buttonElement(1).nativeElement.click();
        expect((service as any).stopped).toEqual(true);
    });

    it('AudioPlayerControls should pause when pause button is clicked', () => {
        setupTest(new MockAudioPlayerService(true, '', true));
        expect((service as any).paused).toEqual(false);
        buttonElement(0).nativeElement.click();
        expect((service as any).paused).toEqual(true);
    });

    it('AudioPlayerControls should display current time', () => {
        setupTest(new MockAudioPlayerService(true, 'testTime', false));
        const target = 'ng-reflect-model="testTime"';
        expect(currentTimeElement().nativeElement.outerHTML).toContain(target);
    });

    it('AudioPlayerControls should display read only current time when audio is playing', () => {
        setupTest(new MockAudioPlayerService(true, '', true));
        const target = 'readonly=""';
        expect(currentTimeElement().nativeElement.outerHTML).toContain(target);
    });
});

class MockAudioPlayerService {

    constructor(public loaded: boolean, public currentTime: string, public playing: boolean) {
    }

    played = false;
    paused = false;
    stopped = false;

    play() {
        this.played = true;
    }

    pause() {
        this.paused = true;
    }

    stop() {
        this.stopped = true;
    }
}
