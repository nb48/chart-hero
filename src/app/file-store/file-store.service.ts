import { Injectable } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartLoaderService } from '../chart/chart-loader/chart-loader.service';

@Injectable()
export class FileStoreService {

    private $audioFileName: string;
    private $chartFileName: string;

    constructor(private audioPlayer: AudioPlayerService, private chartLoader: ChartLoaderService) {
    }

    get audioFileName(): string {
        return this.$audioFileName;
    }

    set audioFile(file: File) {
        this.$audioFileName = file.name;
        this.audioPlayer.audio = URL.createObjectURL(file);
    }

    get chartFileName(): string {
        return this.$chartFileName;
    }

    set chartFile(file: File) {
        this.$chartFileName = file.name;
        this.chartLoader.chart = URL.createObjectURL(file);
    }
}
