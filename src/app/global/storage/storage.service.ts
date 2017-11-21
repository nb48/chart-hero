import { Injectable } from '@angular/core';

import { StepService, StepInfo } from '../../controller/step/step.service';
import { FileService } from '../../file/file.service';
import { SpeedService } from '../../fretboard/speed/speed.service';
import { ModelService } from '../../model/model.service';
import { Model } from '../../model/model';
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
        this.fileService.chartFileNames.subscribe(cfn => this.save('chartFileName', cfn));
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
        this.loadStepInfo();
        this.loadChartFileName();
        this.loadSpeed();
        this.loadModel();
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
        }
    }
}
