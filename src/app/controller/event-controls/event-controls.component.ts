import { Component } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackEventType, ModelTrackBPMChange, ModelTrackTSChange } from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { BPMService } from '../bpm/bpm.service';
import { SelectorService } from '../selector/selector.service';
import { TimeSignatureService } from '../time-signature/time-signature.service';

const BPM_CHANGE = 'BPM Change';
const TS_CHANGE = 'Time Signature Change';
const SOLO_TOGGLE = 'Solo Toggle';
const STAR_POWER_TOGGLE = 'Star Power Toggle';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    styleUrls: ['./event-controls.component.css'],
})
export class EventControlsComponent {

    selected: boolean;
    id: number;
    time: number;
    formattedTime: string;
    type: string;
    value: number;

    constructor(
        private actionsService: ActionsService,
        private bpmService: BPMService,
        private selectorService: SelectorService,
        private timeSignatureService: TimeSignatureService,
    ) {
        this.selected = false;
        this.selectorService.selectedEvents.subscribe((event) => {
            if (!event) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = event.id;
            this.time = event.time;
            this.formattedTime = showTime(event.time);
            if (event.event === ModelTrackEventType.BPMChange) {
                this.type = BPM_CHANGE;
                this.value = (event as ModelTrackBPMChange).bpm;
            }
            if (event.event === ModelTrackEventType.TSChange) {
                this.type = TS_CHANGE;
                this.value = (event as ModelTrackTSChange).ts;
            }
            if (event.event === ModelTrackEventType.SoloToggle) {
                this.type = SOLO_TOGGLE;
            }
            if (event.event === ModelTrackEventType.StarPowerToggle) {
                this.type = STAR_POWER_TOGGLE;
            }
        });
    }

    get isBPMChange(): boolean {
        return this.type === BPM_CHANGE;
    }

    get isTSChange(): boolean {
        return this.type === TS_CHANGE;
    }

    bpmChanged(bpm: number): void {
        if (bpm && bpm > 0 && bpm <= 10000) {
            this.bpmService.updateBPM(bpm);            
        }
    }

    tsChanged(ts: number): void {
        if (ts && ts > 0 && ts <= 100) {
            this.timeSignatureService.updateTimeSignature(ts);
        }
    }

    delete(): void {
        const idToDelete = this.id;
        this.selectorService.selectNearest();
        if (this.type === BPM_CHANGE || this.type === TS_CHANGE) {
            this.actionsService.deleteSyncTrackEvent(idToDelete);            
        }
        if (this.type === SOLO_TOGGLE || this.type === STAR_POWER_TOGGLE) {
            this.actionsService.deleteTrackEvent(idToDelete);
        }
    }
}
