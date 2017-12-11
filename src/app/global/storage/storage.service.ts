import { Injectable } from '@angular/core';

import { StepService, StepInfo } from '../../controller/step/step.service';
import { FileService } from '../../file/file.service';
import { SpeedService } from '../../fretboard/speed/speed.service';
import { IdGeneratorService } from '../../model/id-generator/id-generator.service';
import { ModelService } from '../../model/model.service';
import { Model } from '../../model/model';
import { TimeService } from '../../time/time.service';
import { VolumeService } from '../../time/volume/volume.service';
import { TrackService } from '../../track/track.service';
import { KeybindingsService, Keybinding } from '../keybindings/keybindings.service';

@Injectable()
export class StorageService {
    
    constructor(
        private stepService: StepService,
        private fileService: FileService,
        private speedService: SpeedService,
        private idGeneratorService: IdGeneratorService,
        private modelService: ModelService,
        private timeService: TimeService,
        private volumeService: VolumeService,
        private trackService: TrackService,
        private keybindingsService: KeybindingsService,
    ) {
        this.load();
        this.stepService.stepInfos.subscribe(si => this.save('stepInfo', si));
        this.fileService.chartFileNames.subscribe(cfn => this.save('chartFileName', cfn));
        this.speedService.speeds.subscribe(s => this.save('speed', s));
        this.modelService.models.subscribe(m => this.save('model', m));
        this.timeService.times.subscribe((t) => {
            if (!this.timeService.playing) {
                this.save('time', t);
            }
        });
        this.volumeService.volumes.subscribe(v => this.save('volume', v));
        this.trackService.tracks.subscribe(t => this.save('track', t));
        this.keybindingsService.keybindings.subscribe(ks => this.save('keybindings', ks));
    }

    private save(name: string, value: any): void {
        localStorage.setItem(name, JSON.stringify(value));
    }

    private load(): void {
        this.loadStepInfo();
        this.loadChartFileName();
        this.loadSpeed();
        this.loadModel();
        this.loadTime();
        this.loadVolume();
        this.loadTrack();
        this.loadKeybindings();
    }

    private loadStepInfo(): void {
        const stepInfoString = localStorage.getItem('stepInfo');
        if (stepInfoString) {
            const stepInfo = JSON.parse(stepInfoString) as StepInfo;
            this.stepService.newStep(
                stepInfo.stepControl,
                stepInfo.customStepTop,
                stepInfo.customStepBottom,
            );
        }
    }

    private loadChartFileName(): void {
        const chartFileNameString = localStorage.getItem('chartFileName');
        if (chartFileNameString) {
            const chartFileName = JSON.parse(chartFileNameString) as string;
            this.fileService.loadChartFileName(chartFileName);
        }
    }

    private loadSpeed(): void {
        const speedString = localStorage.getItem('speed');
        if (speedString) {
            const speed = JSON.parse(speedString) as number;
            this.speedService.speed = speed;
        }
    }

    private loadModel(): void {
        const modelString = localStorage.getItem('model');
        if (modelString) {
            const model = JSON.parse(modelString) as Model;
            this.modelService.model = model;
            const events = [
                ...model.syncTrack.events,
                ...model.guitar.expert.events,
                ...model.guitar.hard.events,
                ...model.guitar.medium.events,
                ...model.guitar.easy.events,
                ...model.ghlGuitar.expert.events,
                ...model.ghlGuitar.hard.events,
                ...model.ghlGuitar.medium.events,
                ...model.ghlGuitar.easy.events,
                ...model.events.events,
                ...model.vocals.events,
                ...model.venue.events,
            ];
            const maxId = events.sort((a, b) => b.id - a.id)[0].id;
            this.idGeneratorService.catchUp(maxId);
        }
    }

    private loadTime(): void {
        const timeString = localStorage.getItem('time');
        if (timeString) {
            const time = JSON.parse(timeString) as number;
            this.timeService.time = time;
        }
    }

    private loadVolume(): void {
        const volumeString = localStorage.getItem('volume');
        if (volumeString) {
            const volume = JSON.parse(volumeString) as number;
            this.volumeService.newVolume(volume);
        }
    }

    private loadTrack(): void {
        const trackString = localStorage.getItem('track');
        if (trackString) {
            const track = JSON.parse(trackString) as number;
            this.trackService.newTrack(track);
        }
    }

    private loadKeybindings(): void {
        const keybindingsString = localStorage.getItem('keybindings');
        if (keybindingsString) {
            const keybindings = JSON.parse(keybindingsString) as Keybinding[];
            this.keybindingsService.updateBinds(keybindings);
        }
    }
}
