const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");


//

const extractCSS = new ExtractTextPlugin({filename: 'main.css'});

module.exports = {
    entry: {
        app: './src/app/setup.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist',
        filename: '[name]-[chunkhash].min.js'
    },
    devtool: 'source-map',
    // profile: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.ejs'),
            //filename: path.resolve(__dirname, './dist', 'index.html'),
            filename: path.resolve(__dirname, 'index.html'),
            inject: true,
            // inject: false,
        }),
       //new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: "vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("lib") !== -1;
            }
        }),
        extractCSS,
      new CopyWebpackPlugin([
            {from: 'src/lib/three.js'},
          {from: 'src/lib/CSS3DRenderer.js'},
          {from: 'src/lib/OrbitControls.js'},
          {from: 'src/lib/Tween.js'},
          {from: 'src/page/templates/*.html'}
        ])
    /*    new webpack.ProvidePlugin({
       //     jQuery: 'jquery',
            $: 'src/lib/jquery.min.js'
        })*/
        /*
       new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css|woff|woff2|eot|tff|png|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })*/
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'lib')

        ]
    },
    module: {
        rules: [
            {test: /src.*\.js$/, use: {loader: 'babel-loader', options: {presets: ["env"]}}},
            //{test: /src.*\.css$/, use: ['style-loader', 'css-loader']},
            {test: /src\/css.*\.css$/, use: extractCSS.extract({fallback: 'style-loader', use: ['css-loader']})},
            {test: /\.html$/, use: ['html-loader']},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/octet-stream']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
            {test: /\.(jpe?g|png|gif|svg)$/i, use: ['file-loader?limit=10000']},
            {
                test: require.resolve(__dirname + '/src/lib/jquery.min.js'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};
