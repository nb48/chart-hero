import { Injectable } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ModelImporterService } from '../model/import-export/model-importer.service';

@Injectable()
export class FileStoreService {

    private $audioFileName: string;
    private $chartFileName: string;

    constructor(
        private audioPlayer: AudioPlayerService,
        private modelImporter: ModelImporterService) {
    }

    get audioFileName(): string {
        return this.$audioFileName;
    }

    set audioFile(file: File) {
        if (this.audioPlayer.playing) {
            this.audioPlayer.stop();
        }
        this.$audioFileName = file.name;
        this.audioPlayer.audio = URL.createObjectURL(file);
    }

    get chartFileName(): string {
        return this.$chartFileName;
    }

    set chartFile(file: File) {
        if (this.audioPlayer.playing) {
            this.audioPlayer.stop();
        }
        this.$chartFileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            this.modelImporter.import(reader.result);
        };
        reader.readAsText(file);
    }
}
