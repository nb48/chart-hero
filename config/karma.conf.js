var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    var _config = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [{
            pattern: './karma-test-shim.js',
            watched: false
        }],
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            quiet: true
        },
        webpackServer: {
            quiet: true
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true
    };
    config.set(_config);
};
