import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartFileImporterService } from '../chart-file/chart-file-importer.service';
import { FileStoreService } from './file-store.service';

const testFile = new File(['testFileString'], 'testFileName');

describe('Service: FileStoreService', () => {

    let service: FileStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AudioPlayerService, useClass: MockAudioPlayerService },
                { provide: ChartFileImporterService, useClass: MockChartFileImporterService },
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

    it('FileStore should pass chart string to chart importer after setting chart file', (done) => {
        service.chartFile = testFile;
        setTimeout(() => {
            const chartFileImporter = TestBed.get(ChartFileImporterService);
            expect((chartFileImporter as any).file).toEqual('testFileString');
            done();
        });
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

class MockChartFileImporterService {

    public file: string;

    import(file: string) {
        this.file = file;
    }
}
