import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from './../audio-player/audio-player.service';
import { FileStoreService } from './file-store.service';

const testFile = new File([''], 'testFileName');

describe('Service: FileStoreService', () => {

    let service: FileStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AudioPlayerService, useClass: MockAudioPlayerService },
                FileStoreService,
            ],
        });
        service = TestBed.get(FileStoreService);
    });

    it('FileStore should update audio file name after setting audio file', () => {
        service.audioFile = testFile;
        expect(service.audioFileName).toEqual('testFileName');
    });

    it('FileStore should pass object url to audio player after setting audio file', () => {
        service.audioFile = testFile;
        const exampleUrl = URL.createObjectURL(testFile);
        const audioPlayer = TestBed.get(AudioPlayerService);
        expect((audioPlayer as any).url.length).toEqual(exampleUrl.length);
    });
});

class MockAudioPlayerService {

    private $url: string;

    set audio(url: string) {
        this.$url = url;
    }

    get url(): string {
        return this.$url;
    }
}
