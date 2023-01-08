const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './src/App.jsx')
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableSassLoader()
  .enableReactPreset()
  .enableIntegrityHashes(Encore.isProduction())

if (Encore.isProduction()) {
  Encore.setPublicPath('/owl-buvette/build/')
  Encore.setManifestKeyPrefix('build/')
}

module.exports = Encore.getWebpackConfig()
