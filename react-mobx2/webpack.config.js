const path = require('path')

// ----------------------------------------------------

const IS_DEV = process.env.NODE_ENV !== 'production'
const MODE   = IS_DEV ? 'development' : 'production'

// ----------------------------------------------------

const config = {
    mode: MODE,
    entry: './js/entry/main.js',
    output: {
        path: path.join(__dirname, '/js/bundle'),
        filename: '[name].[contenthash].js',
        publicPath: '/js/bundle/',
    },
    resolve: {
        modules: [
            path.join(__dirname, '/components'),
            path.join(__dirname, '/modules'),
            'node_modules',
        ],
    },
    devServer: {
        port: 9011,
    },
    devtool: 'source-map',
    optimization: {
        moduleIds: 'hashed',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use : [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ],
    },
}

if(IS_DEV){
    config.mode                   = 'development'
    config.watch                  = true
    config.devtool                = 'inline-cheap-module-source-map'
    config.output.filename        = '[name].js'
    config.optimization.moduleIds = 'named'
}

// ----------------------------------------------------

module.exports = config
