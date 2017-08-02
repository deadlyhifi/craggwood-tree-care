const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: './inc/scss/style.scss',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([
            { from: 'inc/img', to: 'img' },
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: 60,
                    progressive: true
                })
            ]
        })
    ]
}
