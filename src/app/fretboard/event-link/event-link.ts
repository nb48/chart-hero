import { ModelTrackEventType } from '../../model/model';

export interface EventLink {
    type: ModelTrackEventType;
    x: number;
    y1: number;
    y2: number;
}
