import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from './audio-player.service';

const testFileUrl = URL.createObjectURL(new File([''], ''));

describe('Service: AudioPlayerService', () => {

    let service: AudioPlayerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AudioPlayerService,
            ],
        });
        service = TestBed.get(AudioPlayerService);
    });

    it('AudioPlayer should not be loaded initially', () => {
        expect(service.loaded).toEqual(false);
    });

    it('AudioPlayer should be loaded after setting audio', () => {
        service.audio = testFileUrl;
        expect(service.loaded).toEqual(true);
    });

    it('AudioPlayer should have current time of 0m0.00s after setting audio', () => {
        service.audio = testFileUrl;
        expect(service.currentTime).toEqual('0m0.00s');
    });

    it('AudioPlayer should not be playing after setting audio', () => {
        service.audio = testFileUrl;
        expect(service.playing).toEqual(false);
    });

    it('AudioPlayer should play after calling play', () => {
        service.audio = testFileUrl;
        service.play();
        expect(service.playing).toEqual(true);
    });
    
    it('AudioPlayer should pause after calling pause', () => {
        service.audio = testFileUrl;
        service.play();
        service.pause();
        expect(service.playing).toEqual(false);
    });
        
    it('AudioPlayer should stop after calling stop', () => {
        service.audio = testFileUrl;
        service.play();
        service.stop();
        expect(service.playing).toEqual(false);
        expect(service.currentTime).toEqual('0m0.00s');
    });
        
    it('AudioPlayer should stop after calling pause and then stop', () => {
        service.audio = testFileUrl;
        service.play();
        service.pause();
        service.stop();
        expect(service.playing).toEqual(false);
        expect(service.currentTime).toEqual('0m0.00s');
    });

    it('AudioPlayer should play after calling pause and then play', () => {
        service.audio = testFileUrl;
        service.play();
        service.pause();
        service.play();
        expect(service.playing).toEqual(true);
    });
});
