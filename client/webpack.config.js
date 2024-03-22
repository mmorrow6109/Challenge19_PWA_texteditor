const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set webpack mode to development

    entry: {
      main: './src/js/index.js', // Entry point for the main bundle
      install: './src/js/install.js' // Entry point for the install bundle
    },

    output: {
      filename: '[name].bundle.js', // Output file name for each entry point
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    plugins: [
      // HTMLWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html', // HTML template for the main bundle
        filename: 'index.html', // Output HTML filename
        chunks: ['main'] // Include only the 'main' bundle
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html', // HTML template for the install bundle
        filename: 'install.html', // Output HTML filename
        chunks: ['install'] // Include only the 'install' bundle
      }),

      // WebpackPwaManifest to generate PWA manifest file
      new WebpackPwaManifest({
        name: 'Text Editor', // App name
        short_name: 'textEditor', // Short name for the app
        description: 'just another text editor', // App description
        background_color: '#ffffff', // Background color for the splash screen
        theme_color: '#000000', // Theme color for the app
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the app icon
            sizes: [96, 128, 192, 256, 384, 512] // Icon sizes
          }
        ]
      }),

      // InjectManifest to inject service worker into the bundle
      new InjectManifest({
        swSrc: './src/src-sw.js', // Path to the service worker source file
        swDest: 'src-sw.js', // Output service worker filename
        exclude: [/\.map$/, /asset-manifest\.json$/], // Files to exclude from caching
      })
    ],

    module: {
      rules: [
        // CSS loader configuration
        {
          test: /\.css$/, // Files ending with .css
          use: ['style-loader', 'css-loader'] // Use style-loader and css-loader
        },

        // Babel loader configuration for JavaScript files
        {
          test: /\.js$/, // Files ending with .js
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader for transpilation
            options: {
              presets: ['@babel/preset-env'] // Babel preset for environment compatibility
            }
          }
        }
      ],
    },
  };
};
