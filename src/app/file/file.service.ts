import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { AudioPlayerService } from '../time/audio-player/audio-player.service';
import { ModelImporterService } from '../model/import-export/model-importer.service';
import { TimeService } from '../time/time.service';

@Injectable()
export class FileService {

    private audioFileNameSubject: BehaviorSubject<string>;
    private chartFileNameSubject: BehaviorSubject<string>;
    private audioFileSubject: ReplaySubject<Blob>;

    constructor(
        private audioPlayer: AudioPlayerService,
        private modelImporter: ModelImporterService,
        private timeService: TimeService,
    ) {
        this.audioFileNameSubject = new BehaviorSubject<string>('');
        this.chartFileNameSubject = new BehaviorSubject<string>('');
        this.audioFileSubject = new ReplaySubject<Blob>();
    }

    get audioFileNames(): Observable<string> {
        return this.audioFileNameSubject.asObservable();
    }

    set audioFile(file: File) {
        if (this.timeService.playing) {
            this.timeService.stop();
        }
        this.audioFileSubject.next(file);
        this.audioFileNameSubject.next(file.name);
        const extension = file.name.split('.')[1];
        if (!extension) {
            return;
        }
        this.audioPlayer.setAudio(URL.createObjectURL(file), extension);
    }

    get chartFileNames(): Observable<string> {
        return this.chartFileNameSubject.asObservable();
    }

    set chartFile(file: File) {
        if (this.timeService.playing) {
            this.timeService.stop();
        } else {
            this.timeService.time = 0;
        }
        this.chartFileNameSubject.next(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            this.modelImporter.import(reader.result);
        };
        reader.readAsText(file);
    }

    get audioFiles(): Observable<Blob> {
        return this.audioFileSubject.asObservable();
    }
}
