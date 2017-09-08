import { by, element } from 'protractor';

export class SampleFeaturePage {
    static helloWorld = () => element(by.css('.app p'));
}
