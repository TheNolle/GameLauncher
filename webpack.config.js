const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const process = require('process')

const { loader } = MiniCssExtractPlugin

const entry = './src/index.js'

const moduleRules = {
    rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'], resolve: { fullySpecified: false } },
        { test: /\.css$/i, use: [loader, 'css-loader'] },
        { test: /\.s[ac]ss$/i, use: [loader, 'css-loader', 'sass-loader'] },
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
        { test: /\.pdf$/, use: [{ loader: 'file-loader', options: { name: '[path][name].[ext]' } }] }
    ],
}

const resolve = {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
}

const output = {
    path: __dirname + '/dist',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    filename: 'bundle.js',
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        templateParameters: {
            PUBLIC_URL: process.env.PUBLIC_URL || '',
        },
    }),
    new MiniCssExtractPlugin({
        filename: 'style.css',
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: './public/favicon.ico',
                to: 'favicon.ico',
            },
        ],
    }),
]

const devServer = {
    static: {
        directory: './dist',
    },
    historyApiFallback: true,
    allowedHosts: ['localhost'],
    hot: true,
}

const watchOptions = {
    ignored: /node_modules/,
}


module.exports = {
    entry,
    module: moduleRules,
    resolve,
    output,
    plugins,
    devServer,
    watchOptions,
}
