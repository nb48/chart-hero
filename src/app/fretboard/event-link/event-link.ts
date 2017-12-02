import { ModelTrackEventType } from '../../model/model';

export interface EventLink {
    id: number;
    type: ModelTrackEventType;
    x: number;
    y1: number;
    y2: number;
}
