import { Model, ModelTrack } from '../model/model';

export enum Track {
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

export const getTrack = (cs: Model, track: Track): ModelTrack => {
    switch (track) {
    case Track.GuitarExpert:
        return cs.guitar.expert;
    case Track.GuitarHard:
        return cs.guitar.hard;
    case Track.GuitarMedium:
        return cs.guitar.medium;
    case Track.GuitarEasy:
        return cs.guitar.easy;
    case Track.GHLGuitarExpert:
        return cs.ghlGuitar.expert;
    case Track.GHLGuitarHard:
        return cs.ghlGuitar.hard;
    case Track.GHLGuitarMedium:
        return cs.ghlGuitar.medium;
    case Track.GHLGuitarEasy:
        return cs.ghlGuitar.easy;
    case Track.Events:
        return cs.events;
    case Track.Vocals:
        return cs.vocals;
    case Track.Venue:
        return cs.venue;
    }
};

export const isGHLTrack = (track: Track): boolean => {
    switch (track) {
    case Track.GHLGuitarExpert:
    case Track.GHLGuitarHard:
    case Track.GHLGuitarMedium:
    case Track.GHLGuitarEasy:
        return true;
    default:
        return false;
    }
};
