const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    bootstrap: './src/js/bootstrap.js',
    index: './src/js/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './public',
    hot: 'only',
    liveReload: true,
    port: 3000,
    watchFiles: ['./public/**/*', './src/**/*'],
  },
  output: {
    filename: '[name]-[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)/i,
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // postcss plugins, can be exported to postcss.config.js
                  return [require('autoprefixer')]
                },
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      minify: false,
    }),
    new MiniCssExtractPlugin(),
  ],
}
