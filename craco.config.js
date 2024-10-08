const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "querystring": require.resolve("querystring-es3"),
                "url": require.resolve("url/"),
                "crypto": require.resolve("crypto-browserify"),
                "path": require.resolve("path-browserify"),
                "stream": require.resolve("stream-browserify"),
                "fs": false,
                "buffer": require.resolve("buffer/"),
                "process": require.resolve("process/browser.js"),
            };

            webpackConfig.plugins.push(new webpack.ProvidePlugin({
                process: 'process/browser.js',
            }));
            webpackConfig.plugins.push(new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }));

            return webpackConfig;
        },
    },
};
