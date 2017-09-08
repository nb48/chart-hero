var helpers = require('./helpers');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        browserName: 'chrome'
    },
    specs: helpers.root('e2e', 'features', '*', '*.feature'),
    baseUrl: 'http://localhost:9000',
    cucumberOpts: {
        require: helpers.root('e2e', 'dist', 'features', '*', '*.js')
    },
    SELENIUM_PROMISE_MANAGER: false
}
