import { Injectable } from '@angular/core';

import { AudioPlayerService } from '../time/audio-player/audio-player.service';
import { ModelImporterService } from '../model/import-export/model-importer.service';
import { TimeService } from '../time/time.service';

@Injectable()
export class FileService {

    private $audioFileName: string;
    private $chartFileName: string;

    constructor(
        private audioPlayer: AudioPlayerService,
        private modelImporter: ModelImporterService,
        private timeService: TimeService,
    ) {
    }

    get audioFileName(): string {
        return this.$audioFileName;
    }

    set audioFile(file: File) {
        if (this.timeService.playing) {
            this.timeService.stop();
        }
        this.$audioFileName = file.name;
        const extension = file.name.split('.')[1];
        if (!extension) {
            return;
        }
        this.audioPlayer.setAudio(URL.createObjectURL(file), extension);
    }

    get chartFileName(): string {
        return this.$chartFileName;
    }

    set chartFile(file: File) {
        if (this.timeService.playing) {
            this.timeService.stop();
        } else {
            this.timeService.time = 0;
        }
        this.$chartFileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            this.modelImporter.import(reader.result);
        };
        reader.readAsText(file);
    }
}
