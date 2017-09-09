import { Injectable } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';

@Injectable()
export class FileStoreService {

    private $audioFileName: string;

    constructor(private audioPlayer: AudioPlayerService) {
    }

    get audioFileName(): string {
        return this.$audioFileName;
    }

    set audioFile(file: File) {
        this.$audioFileName = file.name;
        this.audioPlayer.audio = URL.createObjectURL(file);
    }
}
