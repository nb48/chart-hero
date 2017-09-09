var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': helpers.root('src', 'polyfills.ts'),
        'vendor': helpers.root('src', 'vendor.ts'),
        'main': helpers.root('src', 'main.ts'),
        'styles': helpers.root('src', 'styles.css')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                configFile: helpers.root('src', 'tslint.json'),
                formatter: 'grouped',
                formattersDirectory: helpers.root('node_modules', 'custom-tslint-formatters', 'formatters'),
                tsConfigFile: helpers.root('src', 'tsconfig.json')
            }
        }, {
            test: /\.ts$/,
            loaders: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: helpers.root('src', 'tsconfig.json')
                }
            }, {
                loader: 'angular2-template-loader'
            }]
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
        }, {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap'
            })
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
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: helpers.root('src', 'index.html')
        })
    ]
}
