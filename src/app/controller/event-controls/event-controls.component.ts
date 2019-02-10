import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import {
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackTSChange,
    ModelTrackPracticeSection,
} from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { BPMService } from '../bpm/bpm.service';
import { PracticeSectionService } from '../practice-section/practice-section.service';
import { SelectorService } from '../selector/selector.service';
import { TimeSignatureService } from '../time-signature/time-signature.service';

const BPM_CHANGE = 'BPM Change';
const TIME_SIGNATURE_CHANGE = 'Time Signature Change';
const PRACTICE_SECTION = 'Practice Section';
const SOLO_TOGGLE = 'Solo Toggle';
const STAR_POWER_TOGGLE = 'Star Power Toggle';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    styleUrls: ['./event-controls.component.css'],
})
export class EventControlsComponent implements OnDestroy {

    subscription: Subscription;
    selected: boolean;
    id: number;
    time: number;
    formattedTime: string;
    type: string;
    value: number;
    text: string;
    disableDelete: boolean;

    constructor(
        private actionsService: ActionsService,
        private bpmService: BPMService,
        private practiceSectionService: PracticeSectionService,
        private selectorService: SelectorService,
        private timeSignatureService: TimeSignatureService,
    ) {
        this.selected = false;
        this.subscription = this.selectorService.selectedEvents.subscribe((event) => {
            if (!event) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = event.id;
            this.time = event.time;
            this.formattedTime = showTime(event.time);
            this.disableDelete = false;
            if (event.event === ModelTrackEventType.BPMChange) {
                this.type = BPM_CHANGE;
                this.value = (event as ModelTrackBPMChange).bpm;
                if (this.time === 0) {
                    this.disableDelete = true;
                }
            }
            if (event.event === ModelTrackEventType.TSChange) {
                this.type = TIME_SIGNATURE_CHANGE;
                this.value = (event as ModelTrackTSChange).ts;
            }
            if (event.event === ModelTrackEventType.PracticeSection) {
                this.type = PRACTICE_SECTION;
                this.text = (event as ModelTrackPracticeSection).name;
            }
            if (event.event === ModelTrackEventType.SoloToggle) {
                this.type = SOLO_TOGGLE;
            }
            if (event.event === ModelTrackEventType.StarPowerToggle) {
                this.type = STAR_POWER_TOGGLE;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get isBPMChange(): boolean {
        return this.type === BPM_CHANGE;
    }

    get isTimeSignatureChange(): boolean {
        return this.type === TIME_SIGNATURE_CHANGE;
    }

    get isPracticeSection(): boolean {
        return this.type === PRACTICE_SECTION;
    }

    bpmChanged(bpm: number): void {
        if (bpm && bpm > 0 && bpm <= 10000) {
            this.bpmService.updateBPM(bpm);
        }
    }

    timeSignatureChanged(ts: number): void {
        if (ts && ts > 0 && ts <= 100) {
            this.timeSignatureService.updateTimeSignature(ts);
        }
    }

    practiceSectionChanged(name: string): void {
        if (name && name !== '') {
            this.practiceSectionService.updatePracticeSection(name);
        }
    }

    delete(): void {
        this.actionsService.deleteEvent();
    }

    keyDown(event: Event) {
        event.stopPropagation();
    }
}
