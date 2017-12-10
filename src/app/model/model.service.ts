import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Model } from './model';

@Injectable()
export class ModelService {

    private currentModelSubject: ReplaySubject<Model>;
    private currentModel: Model;

    constructor() {
        this.currentModelSubject = new ReplaySubject<Model>();
    }

    set model(model: Model) {
        this.currentModel = model;
        this.currentModelSubject.next(model);
    }

    get model(): Model {
        return this.currentModel;
    }

    get models(): Observable<Model> {
        return this.currentModelSubject.asObservable();
    }
}
