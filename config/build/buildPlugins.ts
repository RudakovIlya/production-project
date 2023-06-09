import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { BuildOptions } from './types/config'

export const buildPlugins = ({
  paths, isDev, apiURL, project,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins = [
    /* new HtmlWebpackPlugin: Automatically includes scripts in our index.html */
    new HtmlWebpackPlugin({ template: paths.html }),
    /* new ProgressPlugin: Shows the percentage progress of our build */
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    /* webpack.DefinePlugin: Allows you to create global variables */
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiURL),
      __PROJECT__: JSON.stringify(project),
    }),
  ]

  if (isDev) {
    plugins.push(
      new ReactRefreshPlugin({ overlay: false }),
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    )
  }

  return plugins
}
