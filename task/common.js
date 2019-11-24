

var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {

    // devtool: 'source-map',
   
    module: {
        loaders: [
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextWebpackPlugin.extract('style','css!sass?outputStyle=expanded')
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]_[hash]',
                    prefixize: true,
                    // spriteModule: './static/images/'
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=5120&name=[path][name].[ext]?[hash:8]',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react','es2015','stage-0'],
                    plugins: ['transform-es2015-spread']
                }
            }
        ]
    },
    resolve: {
        extensive: ['','.js'],
        alias: {
            // "react":        __dirname + "/node_modules/react/react.js",
            // "react-dom":    __dirname + "/node_modules/react/lib/ReactDOM.js",
        }
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextWebpackPlugin('main.css?[hash:8]',{allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
        }),
    ]
};

