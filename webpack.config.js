const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
      path: path.resolve(__dirname, 'output'),
      filename: 'bundle.js'
    },
    resolve: {
       extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './src',
        publicPath: '/output',
        proxy: {
            '/lib/gtrtfs/Departures.csv': {
                changeOrigin: true,
                target: 'http://developer.mbta.com',
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                loader: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },
    performance: { 
        hints: false 
    }
};