import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartLoaderService } from '../chart/chart-loader/chart-loader.service';
import { FileStoreService } from './file-store.service';

const testFile = new File([''], 'testFileName');

describe('Service: FileStoreService', () => {

    let service: FileStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AudioPlayerService, useClass: MockAudioPlayerService },
                { provide: ChartLoaderService, useClass: MockChartLoaderService },
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

    it('FileStore should update chart file name after setting chart file', () => {
        service.chartFile = testFile;
        expect(service.chartFileName).toEqual('testFileName');
    });

    it('FileStore should pass object url to chart loader after setting chart file', () => {
        service.chartFile = testFile;
        const exampleUrl = URL.createObjectURL(testFile);
        const chartLoader = TestBed.get(ChartLoaderService);
        expect((chartLoader as any).url.length).toEqual(exampleUrl.length);
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

class MockChartLoaderService {

    private $url: string;

    set chart(url: string) {
        this.$url = url;
    }

    get url(): string {
        return this.$url;
    }
}
