import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { Action } from './keybindings.service';

@Injectable()
export class KeybindingsActionsService {

    constructor(private selectorService: SelectorService) {
    }

    getAction(action: Action): () => void {
        switch (action) {
        case Action.SelectNext:
            return () => this.selectorService.selectNext();
        case Action.SelectPrevious:
            return () => this.selectorService.selectPrevious();
        case Action.AudioPlayOrPause:
            return () => undefined;
        case Action.AudioStop:
            return () => undefined;
        case Action.AudioRepeat:
            return () => undefined;
        case Action.AddNote:
            return () => undefined;
        case Action.AddBPMChange:
            return () => undefined;
        case Action.AddTSChange:
            return () => undefined;
        case Action.AddPracticeSection:
            return () => undefined;
        case Action.AddSoloToggle:
            return () => undefined;
        case Action.AddStarPowerToggle:
            return () => undefined;
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
        case Action.ControlMoveForwards:
            return () => undefined;
        case Action.ControlMoveBackwards:
            return () => undefined;
        case Action.ControlSnapForwards:
            return () => undefined;
        case Action.ControlSnapBackwards:
            return () => undefined;
        case Action.ControlIncreaseLength:
            return () => undefined;
        case Action.ControlDecreaseLength:
            return () => undefined;
        case Action.ControlToggleHOPO:
            return () => undefined;
        case Action.ControlToggleTap:
            return () => undefined;
        case Action.ControlDelete:
            return () => undefined;
        case Action.TapInputSelectAll:
            return () => undefined;
        case Action.TapInputDeselectAll:
            return () => undefined;
        case Action.TapInputCreateNotes:
            return () => undefined;
        case Action.TapInputDeleteTimes:
            return () => undefined;
        case Action.DownloadChart:
            return () => undefined;
        }
    }
}
