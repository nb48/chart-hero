import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
export const expect = chai.expect;

export const checkElementDisplayed = async (element: ElementFinder) => {
    await expect(element.isDisplayed()).to.eventually.be.true;
};

export const checkElementNotPresent = async (element: ElementFinder) => {
    await expect(element.isPresent()).to.eventually.be.false;
};

export const checkElementDisabled = async (element: ElementFinder) => {
    await checkElementDisplayed(element);
    await expect(element.getAttribute('disabled')).to.eventually.equal('true');
};

export const checkElementEnabled = async (element: ElementFinder) => {
    await checkElementDisplayed(element);
    await expect(element.getAttribute('disabled')).to.eventually.equal(null);
};

export const clickElement = async (element: ElementFinder) => {
    await checkElementEnabled(element);
    await browser.wait(EC.elementToBeClickable(element));
    await element.click();
};
