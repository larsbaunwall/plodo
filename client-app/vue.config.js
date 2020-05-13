const fs = require('fs')
var path = require('path')
const webpack = require('webpack')
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const packageJson = fs.readFileSync('./package.json')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const version = JSON.parse(packageJson).version || 0


module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"',
                    APPINSIGHTS_KEY: '"2887a787-00c3-4972-9e3c-e5612a01dfac"',
                    GA_KEY: '"UA-17409657-2"'
                }
            }),
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: [ '/', '/start', '/session', '/privacy' ]
              }),
            //new BundleAnalyzerPlugin(),
        ]
    },
    productionSourceMap: false
}