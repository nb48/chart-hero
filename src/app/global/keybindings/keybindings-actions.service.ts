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
        }
    }
}
