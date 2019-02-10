import { ModelTrackEventType } from '../../model/model';

export interface Event {
    id: number;
    time: number;
    type: ModelTrackEventType;
    x: number;
    y: number;
    selected: boolean;
    word?: string;
}
