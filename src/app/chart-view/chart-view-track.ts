import { Model, ModelTrack } from '../model/model';

export enum ChartViewTrack {
    GuitarExpert,
    GuitarHard,
    GuitarMedium,
    GuitarEasy,
    GHLGuitarExpert,
    GHLGuitarHard,
    GHLGuitarMedium,
    GHLGuitarEasy,
    Events,
    Vocals,
    Venue,
}

export const getTrack = (cs: Model, track: ChartViewTrack): ModelTrack => {
    switch (track) {
    case ChartViewTrack.GuitarExpert:
        return cs.guitar.expert;
    case ChartViewTrack.GuitarHard:
        return cs.guitar.hard;
    case ChartViewTrack.GuitarMedium:
        return cs.guitar.medium;
    case ChartViewTrack.GuitarEasy:
        return cs.guitar.easy;
    case ChartViewTrack.GHLGuitarExpert:
        return cs.ghlGuitar.expert;
    case ChartViewTrack.GHLGuitarHard:
        return cs.ghlGuitar.hard;
    case ChartViewTrack.GHLGuitarMedium:
        return cs.ghlGuitar.medium;
    case ChartViewTrack.GHLGuitarEasy:
        return cs.ghlGuitar.easy;
    case ChartViewTrack.Events:
        return cs.events;
    case ChartViewTrack.Vocals:
        return cs.vocals;
    case ChartViewTrack.Venue:
        return cs.venue;
    }
};
