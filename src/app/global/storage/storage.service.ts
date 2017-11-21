import { Injectable } from '@angular/core';

import { StepService, StepInfo } from '../../controller/step/step.service';
import { FileService } from '../../file/file.service';
import { SpeedService } from '../../fretboard/speed/speed.service';
import { ModelService } from '../../model/model.service';
import { TimeService } from '../../time/time.service';
import { VolumeService } from '../../time/volume/volume.service';

@Injectable()
export class StorageService {

    constructor(
        private stepService: StepService,
        private fileService: FileService,
        private speedService: SpeedService,
        private modelService: ModelService,
        private timeService: TimeService,
        private volumeService: VolumeService,
    ) {
        this.load();
        this.stepService.stepInfos.subscribe(si => this.save('stepInfo', si));
        this.fileService.audioFileNames.subscribe(afn => this.save('audioFileName', afn));
        this.fileService.chartFileNames.subscribe(cfn => this.save('chartFileName', cfn));
        this.fileService.audioFiles.subscribe(af => this.save('audioFile', af));
        this.speedService.speeds.subscribe(s => this.save('speed', s));
        this.modelService.models.subscribe(m => this.save('model', m));
        this.timeService.times.subscribe((t) => {
            if (!this.timeService.playing) {
                this.save('time', t);
            }
        });
        this.volumeService.volumes.subscribe(v => this.save('volume', v));
    }

    private save(name: string, value: any): void {
        localStorage.setItem(name, JSON.stringify(value));
    }

    private load(): void {
        const stepInfo = localStorage.getItem('stepInfo');
        if (stepInfo) {
            this.loadStepInfo(JSON.parse(stepInfo) as StepInfo);
        } else {
            this.defaultStepInfo();
        }
    }

    private loadStepInfo(stepInfo: StepInfo): void {
        this.stepService.newStep(
            stepInfo.stepControl,
            stepInfo.customStepTop,
            stepInfo.customStepBottom,
        );
    }

    private defaultStepInfo(): void {
        this.stepService.newStep('one', 1, 1);
    }
}
