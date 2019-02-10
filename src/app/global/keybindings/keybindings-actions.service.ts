import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { StepService } from '../../controller/step/step.service';
import { TypeService } from '../../controller/type/type.service';
import { ActionsService } from '../../model/actions/actions.service';
import { TapInputService } from '../../tap-input/tap-input.service';
import { TimeService } from '../../time/time.service';
import { Action } from './keybindings.service';

@Injectable()
export class KeybindingsActionsService {

    constructor(
        private selectorService: SelectorService,
        private stepService: StepService,
        private typeService: TypeService,
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
        case Action.AddPhrase:
            return () => this.actionsService.addLyricToggle();
        case Action.AddLyric:
            return () => this.actionsService.addLyric();
        case Action.ControlToggleNote1:
            return () => this.typeService.flip1();
        case Action.ControlToggleNote2:
            return () => this.typeService.flip2();
        case Action.ControlToggleNote3:
            return () => this.typeService.flip3();
        case Action.ControlToggleNote4:
            return () => this.typeService.flip4();
        case Action.ControlToggleNote5:
            return () => this.typeService.flip5();
        case Action.ControlToggleNote6:
            return () => this.typeService.flip6();
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
            return () => this.typeService.flipForceHOPO();
        case Action.ControlToggleTap:
            return () => this.typeService.flipTap();
        case Action.ControlDelete:
            return () => this.actionsService.deleteEvent();
        case Action.TapInputSelectAll:
            return () => this.tapInputService.selectAll();
        case Action.TapInputDeselectAll:
            return () => this.tapInputService.deselectAll();
        case Action.TapInputCreateNotes:
            return () => this.tapInputService.createNotes();
        case Action.TapInputDeleteTimes:
            return () => this.tapInputService.deleteTimes();
        case Action.SnapToSelected:
            return () => this.actionsService.snapToSelected();
        }
    }
}
