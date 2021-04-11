const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: { // 입력
        app: ['./client'],
    },

    module: { // 모듈을 적용한다.
        rules: [{
            test: /\.jsx?/, // 정규표현식
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }]
    },

    output: { // 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }

}