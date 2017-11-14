var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/chart-hero/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextWebpackPlugin('[name].[hash].css'),
        new BaseHrefWebpackPlugin({ baseHref: '/chart-hero/' }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});
