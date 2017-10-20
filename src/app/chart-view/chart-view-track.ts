import { ChartStore, ChartStoreTrack } from '../chart-store/chart-store';

export enum ChartViewTrack {
    GuitarExpert,
    GuitarHard,
    GuitarMedium,
    GuitarEasy,
    BassExpert,
    BassHard,
    BassMedium,
    BassEasy,
    DrumsExpert,
    DrumsHard,
    DrumsMedium,
    DrumsEasy,
    GHLGuitarExpert,
    GHLGuitarHard,
    GHLGuitarMedium,
    GHLGuitarEasy,
    Events,
    Vocals,
    Venue,
}

export const getTrack = (cs: ChartStore, track: ChartViewTrack): ChartStoreTrack => {
    switch (track) {
    case ChartViewTrack.GuitarExpert:
        return cs.guitar.expert;
    case ChartViewTrack.GuitarHard:
        return cs.guitar.hard;
    case ChartViewTrack.GuitarMedium:
        return cs.guitar.medium;
    case ChartViewTrack.GuitarEasy:
        return cs.guitar.easy;
    case ChartViewTrack.BassExpert:
        return cs.bass.expert;
    case ChartViewTrack.BassHard:
        return cs.bass.hard;
    case ChartViewTrack.BassMedium:
        return cs.bass.medium;
    case ChartViewTrack.BassEasy:
        return cs.bass.easy;
    case ChartViewTrack.DrumsExpert:
        return cs.drums.expert;
    case ChartViewTrack.DrumsHard:
        return cs.drums.hard;
    case ChartViewTrack.DrumsMedium:
        return cs.drums.medium;
    case ChartViewTrack.DrumsEasy:
        return cs.drums.easy;
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
