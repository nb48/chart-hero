import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { StepService } from '../../controller/step/step.service';
import { ActionsService } from '../../model/actions/actions.service';
import { TapInputService } from '../../tap-input/tap-input.service';
import { TimeService } from '../../time/time.service';
import { Action } from './keybindings.service';

@Injectable()
export class KeybindingsActionsService {

    constructor(
        private selectorService: SelectorService,
        private stepService: StepService,
        private actionsService: ActionsService,
        private tapInputService: TapInputService,
        private timeService: TimeService,
    ) {
    }

    getAction(action: Action): () => void {
        switch (action) {
        case Action.SelectNext:
            return () => this.selectorService.selectNext();
        case Action.SelectPrevious:
            return () => this.selectorService.selectPrevious();
        case Action.AudioPlayOrPause:
            return () => this.timeService.playing
                ? this.timeService.pause()
                : this.timeService.play();
        case Action.AudioStop:
            return () => this.timeService.stop();
        case Action.AudioRepeat:
            return () => this.timeService.repeat();
        case Action.AddNote:
            return () => this.actionsService.addNote();
        case Action.AddBPMChange:
            return () => this.actionsService.addBPMChange();
        case Action.AddTSChange:
            return () => this.actionsService.addTSChange();
        case Action.AddPracticeSection:
            return () => this.actionsService.addPracticeSection();
        case Action.AddSoloToggle:
            return () => this.actionsService.addSoloToggle();
        case Action.AddStarPowerToggle:
            return () => this.actionsService.addStarPowerToggle();
        case Action.ControlToggleNote1:
            return () => undefined;
        case Action.ControlToggleNote2:
            return () => undefined;
        case Action.ControlToggleNote3:
            return () => undefined;
        case Action.ControlToggleNote4:
            return () => undefined;
        case Action.ControlToggleNote5:
            return () => undefined;
        case Action.ControlToggleNote6:
            return () => undefined;
        case Action.ControlSnapForwards:
            return () => this.stepService.snapForwardsTime();
        case Action.ControlMoveForwards:
            return () => this.stepService.moveForwardsTime();
        case Action.ControlMoveBackwards:
            return () => this.stepService.moveBackwardsTime();
        case Action.ControlSnapBackwards:
            return () => this.stepService.snapBackwardsTime();
        case Action.ControlIncreaseLength:
            return () => this.stepService.increaseSustain();
        case Action.ControlDecreaseLength:
            return () => this.stepService.decreaseSustain();
        case Action.ControlToggleHOPO:
            return () => undefined;
        case Action.ControlToggleTap:
            return () => undefined;
        case Action.ControlDelete:
            return () => undefined;
        case Action.TapInputSelectAll:
            return () => this.tapInputService.selectAll();
        case Action.TapInputDeselectAll:
            return () => this.tapInputService.deselectAll();
        case Action.TapInputCreateNotes:
            return () => this.tapInputService.createNotes();
        case Action.TapInputDeleteTimes:
            return () => this.tapInputService.deleteTimes();
        }
    }
}
