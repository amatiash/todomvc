let webpack = require('webpack'),
    path    = require('path');

module.exports = {
	watch: true,
    devtool: 'source-map',
    entry  : {
        main: './js/entry/main.js'
    },
    output : {
        path         : path.join(__dirname, '/js/bundle'),
        filename     : '[name].js',
        publicPath   : '/js/bundle/',
        chunkFilename: '[id].[name].js',
    },
    resolve: {
        modules: [
            path.join(__dirname, '/components'),
            path.join(__dirname, '/modules'),
            'node_modules'
        ]
    },
    devServer: {
        port: 9001
    },
    module : {
        rules: [
            {
                test: /\.(jade|pug)$/,
                use : ['pug-loader']
            },
            {
                test   : /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use    : ['babel-loader'],
            },
            {
                test: /\.css$/,
                use : [
                    'style-loader',
                    {
                        loader : 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    }
};
