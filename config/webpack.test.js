var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loaders: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: helpers.root('src', 'tsconfig.json'),
                    silent: true
                }
            }, {
                loader: 'angular2-template-loader'
            }]
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'null-loader'
        }, {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: 'null-loader'
        }, {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            loader: 'raw-loader'
        }]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        )
    ]
}
