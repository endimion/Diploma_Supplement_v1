var path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/build/';
const HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];


var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];


module.exports = [{
  //Content
  entry: './reactApp/browser.js',
  // A SourceMap without column-mappings ignoring loaded Source Maps.
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, publicPath),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map',
  },
  // plugins: [new webpack.DefinePlugin({
  //             'process.env.NODE_ENV': JSON.stringify('production')
  //             }),
  //             new webpack.optimize.UglifyJsPlugin()
  //           ],

  module: {
    rules: [
     {
       test: /\.css$/, //use: ['style-loader', 'css-loader'],
       use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          // 'postcss-loader'
        ]
     },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: "babel-loader",
        query: {
          plugins: ['transform-decorators-legacy',"react-html-attrs", 'transform-class-properties'],
          presets: ['es2015', 'stage-0', 'react']
        }//,
      }

      ]
  },
},

{
   entry: './app.js',
   output: {
     path: path.join(__dirname, publicPath),
     filename: 'server.js',
     libraryTarget: 'commonjs2',
     publicPath: '/'
   },
   target: 'node',
   node: {
     console: false,
     global: false,
     process: false,
     Buffer: false,
     __filename: false,
     __dirname: false
   },
   externals: nodeExternals(),
   // plugins: productionPluginDefine,
   module: {

    loaders: [
       {
         test: /\.css$/, //use: ['style-loader', 'css-loader'],
         use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          // 'postcss-loader'
        ]
       },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.js|.jsx?$/,
          exclude: /(node_modules)/,
          loaders: "babel-loader",
          query: {
            plugins: ['transform-decorators-legacy',"react-html-attrs", 'transform-class-properties'],
            presets: ['es2015', 'stage-0', 'react']
          }//,
       }


     ].concat(commonLoaders),

   }
 }





 ]
