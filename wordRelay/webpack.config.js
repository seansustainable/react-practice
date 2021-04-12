const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게, 실서비스: hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: { // 입력
        app: ['./client'],
    },

    module: { // 모듈(Loaders)을 적용한다. 
        rules: [{
            test: /\.jsx?/, // 정규표현식
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers: ['> 5% in KR'], // browserslist
                    },
                    debug: true,
                }], '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin(),
    ],

    output: { // 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/', // app.use('/dist', express.static(__dirname, 'dist'))
    },
    devServer: {
        publicPath: '/dist/', // 가상 경로
        hot: true,
    }
}