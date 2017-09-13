import { by, element, ElementFinder } from 'protractor';

const audioControls = '.audio-player-controls';

export class PlayAudioPage {
    static playButton = () => element(by.css(`${audioControls} .play`));
    static pauseButton = () => element(by.css(`${audioControls} .pause`));  
    static stopButton = () => element(by.css(`${audioControls} .stop`));
    static currentTimeInput = () => element(by.css(`${audioControls} input`));
    static audioFileInput = () => element(by.css('.file-select input'));
}
