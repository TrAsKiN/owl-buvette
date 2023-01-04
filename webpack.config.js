const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
    .setOutputPath('docs/build/')
    // .copyFiles({
    //     from: './assets/images',
    //     to: 'images/[path][name].[hash:8].[ext]',
    //     pattern: /\.(png|jpg|jpeg)$/
    // })
    .setPublicPath('/build')
    .addEntry('app', './src/App.jsx')
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .enableReactPreset()
    .enableIntegrityHashes(Encore.isProduction())

module.exports = Encore.getWebpackConfig()
