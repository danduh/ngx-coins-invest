const release = require('./package.json');
/**
 * Config wo service-worker
 */


module.exports = {
    cacheId: release.version + Date.now(),
    staticFileGlobs: [
        'dist/**/*.{js,css,html,png,jpg,gif,svg,eot,ttf,woff}',
        'dist/assets/i18n/en.json'
    ],
    stripPrefix: 'dist/',
    root: 'dist',
    navigateFallback: 'index.html',
    maximumFileSizeToCacheInBytes: 104194304,
    // importScripts: ['/assets/push-sw.js'],
    runtimeCaching: [
        // {
        //     urlPattern: /^https:\/\/gateway\.integration\.compit\.com\/v2/,
        //     handler: 'networkFirst',
        //     options: {
        //         cache: {
        //             maxEntries: 100,
        //             name: 'reports-cache'
        //         }
        //     }
        // },
        // {
        //     urlPattern: /\/reports/,
        //     handler: 'networkFirst',
        //     options: {
        //         cache: {
        //             maxEntries: 100,
        //             name: 'reports-cache'
        //         }
        //     }
        // },
        // {
        //     urlPattern: /\/permisions/,
        //     handler: 'networkFirst',
        //     options: {
        //         cache: {
        //             maxEntries: 100,
        //             name: 'reports-cache'
        //         }
        //     }
        // }
    ]
};
