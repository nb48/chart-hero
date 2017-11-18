import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from '../time/audio-player/audio-player.service';
import { ModelImporterService } from '../model/import-export/model-importer.service';
import { TimeService } from '../time/time.service';
import { FileService } from './file.service';

const testFile = new File(['testFileString'], 'testFileName');

describe('Service: FileService', () => {

    let service: FileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AudioPlayerService, useClass: MockAudioPlayerService },
                { provide: ModelImporterService, useClass: MockModelImporterService },
                { provide: TimeService, useClass: MockTimeService },
                FileService,
            ],
        });
        service = TestBed.get(FileService);
    });

    it('FileStore should update audio file name after setting audio file', () => {
        service.audioFile = testFile;
        expect(service.audioFileName).toEqual('testFileName');
    });

    it('FileStore should pass blob to audio player after setting audio file', () => {
        service.audioFile = testFile;
        const audioPlayer = TestBed.get(AudioPlayerService);
        expect((audioPlayer as any).blob).toBeDefined;
    });

    it('FileStore should update chart file name after setting chart file', () => {
        service.chartFile = testFile;
        expect(service.chartFileName).toEqual('testFileName');
    });

    it('FileStore should pass chart string to chart importer after setting chart file', (done) => {
        service.chartFile = testFile;
        setTimeout(() => {
            const modelImporter = TestBed.get(ModelImporterService);
            expect((modelImporter as any).file).toEqual('testFileString');
            done();
        });
    });
});

class MockAudioPlayerService {

    private $blob: Blob;

    set audio(blob: Blob) {
        this.$blob = blob;
    }

    get blob(): Blob {
        return this.$blob;
    }
}

class MockModelImporterService {

    public file: string;

    import(file: string) {
        this.file = file;
    }
}

class MockTimeService {
    
    playing: false;
}
