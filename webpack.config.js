const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = () => {
    return {
        entry: {
            main: path.resolve(__dirname, './src/index.tsx'),
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: 'ts-loader',
                    exclude: /[\\/]node_modules[\\/]/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                additionalData: '@import "./src/Shared/Styles/_variables.sass";',
                            },
                        },
                    ],
                },
                // {
                //     test: /\.jsx?$/,
                //     exclude: /node_modules/,
                //     use: {
                //         loader: "babel-loader",
                //         options: {
                //             cacheDirectory: true,
                //             cacheCompression: false,
                //             envName: isProduction ? "production" : "development"
                //         },
                //     },
                // },
            ],
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, './dist'),
            },
            port: 4200,
            open: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            // plugins: [new TsconfigPathsPlugin()],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
        },
        performance: {
            hints: false,
        },
        stats: 'errors-warnings',
    }
}
