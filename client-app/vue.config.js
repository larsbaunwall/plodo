const fs = require('fs')
var path = require('path')
const webpack = require('webpack')
const packageJson = fs.readFileSync('./package.json')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
//const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const version = JSON.parse(packageJson).version || 0
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            }),
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: [ '/', '/start', '/session' ]
              })
        ]
    },
}