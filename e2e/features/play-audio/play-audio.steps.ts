import { binding, then, when } from 'cucumber-tsflow';
import * as path from 'path';
import { browser, ExpectedConditions as EC, ElementFinder, Key, promise } from 'protractor';
import { PlayAudioPage as Page } from './play-audio.page';
import { expect } from '../../helpers';

const checkElementDisplayed = async (element: ElementFinder) => {
    await expect(element.isDisplayed()).to.eventually.be.true;
};

const checkElementNotPresent = async (element: ElementFinder) => {
    await expect(element.isPresent()).to.eventually.be.false;
};

const checkElementDisabled = async (element: ElementFinder) => {
    await checkElementDisplayed(element);
    await expect(element.getAttribute('disabled')).to.eventually.equal('true');
};

const checkElementEnabled = async (element: ElementFinder) => {
    await checkElementDisplayed(element);
    await expect(element.getAttribute('disabled')).to.eventually.equal(null);
};

const clickElement = async (element: ElementFinder) => {
    await checkElementEnabled(element);
    await browser.wait(EC.elementToBeClickable(element));
    await element.click();
};

@binding()
class PlayAudioSteps {

    @when(/^I open the app$/)
    public async whenUserOpensTheApp() {
        await browser.get(browser.baseUrl);
    }

    @when(/^I select an audio file$/)
    public async whenUserSelectsAnAudioFile() {
        const filePath = path.resolve(__dirname, '../../../assets/silence.ogg');
        await Page.audioFileInput().sendKeys(filePath);
        await promise.delayed(1000);
    }

    @when(/^I click on the play button$/)
    public async whenUserClicksOnThePlayButton() {
        await clickElement(Page.playButton());
    }

    @when(/^I click on the pause button$/)
    public async whenUserClicksOnThePauseButton() {
        await clickElement(Page.pauseButton());
    }

    @when(/^I click on the stop button$/)
    public async whenUserClicksOnTheStopButton() {
        await clickElement(Page.stopButton());
    }

    @when(/^I wait for '([^"]*)' seconds$/, null, 10000)
    public async whenUserWaitsForNSeconds(n: number) {
        await promise.delayed(n * 1000);
    }

    @when(/^I type '([^"]*)' into the current time input$/)
    public async whenUserTypesIntoCurrentTimeInput(string: string) {
        await Page.currentTimeInput().sendKeys(Key.chord(Key.CONTROL, 'a'));
        await Page.currentTimeInput().sendKeys(Key.BACK_SPACE);
        await Page.currentTimeInput().clear();
        await Page.currentTimeInput().sendKeys(string);
    }

    @then(/^I should see a disabled play button$/)
    public async thenUserShouldSeeADisabledPlayButton() {
        await checkElementDisabled(Page.playButton());
    }

    @then(/^I should see an enabled play button$/)
    public async thenUserShouldSeeAnEnabledPlayButton() {
        await checkElementEnabled(Page.playButton());
    }

    @then(/^I should see a disabled stop button$/)
    public async thenUserShouldSeeADisabledStopButton() {
        await checkElementDisabled(Page.stopButton());
    }

    @then(/^I should see an enabled stop button$/)
    public async thenUserShouldSeeAnEnabledStopButton() {
        await checkElementEnabled(Page.stopButton());
    }

    @then(/^I should see a disabled current time input$/)
    public async thenUserShouldSeeADisabledCurrentTimeInput() {
        await checkElementDisabled(Page.currentTimeInput());
    }

    @then(/^I should see an enabled current time input with value '([^"]*)' m '([^"]*)' s$/)
    public async thenUserShouldSeeAnEnabledCurrentTimeInput(m: number, s: number) {
        await checkElementEnabled(Page.currentTimeInput());
        await expect(Page.currentTimeInput().getAttribute('value'))
            .to.eventually.include(`${m}m${s}.`);
    }

    @then(/^the audio should be playing$/)
    public async thenTheAudioShouldBePlaying() {
        await checkElementNotPresent(Page.playButton());
        await checkElementDisplayed(Page.pauseButton());
    }

    @then(/^the audio should not be playing$/)
    public async thenTheAudioShouldNotBePlaying() {
        await checkElementDisplayed(Page.playButton());
        await checkElementNotPresent(Page.pauseButton());
    }
}

export = PlayAudioSteps;
