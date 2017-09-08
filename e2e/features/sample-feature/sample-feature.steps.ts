import { binding, then, when } from 'cucumber-tsflow';
import { browser } from 'protractor';
import { SampleFeaturePage as Page } from './sample-feature.page';
import { expect } from '../../helpers';

@binding()
class SampleFeatureSteps {

    @when(/I open the app/)
    public whenUserOpensTheApp(): Promise<void> {
        return Promise.resolve()
            .then(() => browser.get(browser.baseUrl));
    }

    @then(/the text should be displayed/)
    public thenTheTextShouldBeDisplayed(): Promise<void> {
        return expect(Page.helloWorld().getText()).to.eventually.equal('Hello World!');
    }
}

export = SampleFeatureSteps;
