'use strict'
const SERVICEID = require('../src/config.js').SERVICEID
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HashedChunkidsPlugin = require('./hashed-chunkids-webpack-plugin.js')
const faster = process.env.MODE == 'faster'
process.env.NODE_ENV = 'production'

const env = require('../config/prod.env')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 公共js分析
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩
const ExtractTextPlugin = require('extract-text-webpack-plugin') // css抽取
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态html
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css丑化压缩

const fs = require('fs')
const crypto = require('crypto')
function getFileContentHash (filePath, indexNum) {
  const fileData = fs.readFileSync(filePath, 'utf-8')
  return crypto.createHash('md5').update(fileData).digest('hex').substr(0, indexNum)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: SERVICEID + '-[name].[chunkhash:8].js',
    chunkFilename: SERVICEID + '-[name].[chunkhash:8].js',
    publicPath: `/${SERVICEID}/`
  },
  optimization: {
    minimizer: faster ? [] : [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({})],
    // 配置需抽取的js,与HtmlWebpackPlugin配合使用 2023年7月6日12:47:57
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        element: {
          name: 'chunk-element',
          priority: 1,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          reuseExistingChunk: true,
          enforce: true
        },
        vue: {
          name: 'chunk-vue',
          priority: 2,
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          reuseExistingChunk: true,
          enforce: true
        },
        jquery: {
          name: 'chunk-jquery',
          priority: 2,
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CompressionWebpackPlugin({
      test: /\.(js|css|txt)(\?.*)?$/,
      threshold: 10240, // 大于该值的资源会被处理，单位byte
      minRatio: 0.8, // 压缩率大于该值的被处理
      deleteOriginalAssets: false // 是否清除源文件，源文件可被不支持gzip的浏览器使用
    }),
    process.env.BUILD_ANALYZER !== 'false' ? new BundleAnalyzerPlugin() : {
      apply (compiler) {
        compiler.hooks.emit.tap('emit', function () {
          console.log('自定义插件，仅打印本条日志，与分析js插件配合使用，线上打包启用；')
        })
      }
    },
    // new BundleAnalyzerPlugin(),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['../dist/**'], {
      allowExternal: true
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: true,
    //   parallel: true
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[md5:contenthash:hex:8].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: path.resolve(__dirname, `../dist/index.html`),
      // 配置需抽取的js,与splitChunks配合使用 2023年7月6日12:47:57
      chunks: ['app', 'chunk-element', 'chunk-vue', 'chunk-jquery'],
      // chunks: ['app'],
      title: SERVICEID,
      inject: true,
      templateParameters: {
        indexCss: `<link rel="stylesheet" href="${SERVICEID}/assets/css/index.${getFileContentHash(path.resolve(__dirname, '../src/assets/css/index.css'), 8)}.css">`,
        fontAwesomeCss: `<link rel="stylesheet" href="${SERVICEID}/lib/font-awesome.${getFileContentHash(path.resolve(__dirname, '../src/lib/font-awesome.css'), 8)}.css">`,
        bootstrapMinCss: `<link rel="stylesheet" href="${SERVICEID}/lib/bootstrap.min.${getFileContentHash(path.resolve(__dirname, '../src/lib/bootstrap.min.css'), 8)}.css">`
      }
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    new HashedChunkidsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: `assets`,
        ignore: ['.*', 'index.css']
      },
      {
        from: path.resolve(__dirname, '../src/assets/css/index.css'),
        to: `assets/css/index.[hash:8].css`
      },
      {
        from: path.resolve(__dirname, '../src/lib'),
        to: `lib`,
        ignore: ['.*', 'bootstrap.min.css', 'font-awesome.css']
      },
      {
        from: path.resolve(__dirname, '../src/lib/bootstrap.min.css'),
        to: `lib/bootstrap.min.[hash:8].css`
      },
      {
        from: path.resolve(__dirname, '../src/lib/font-awesome.css'),
        to: `lib/font-awesome.[hash:8].css`
      }
    ])
  ]
})

module.exports = webpackConfig
