const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname + '/app',
    entry: './app',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static' }
        ])
    ]
};