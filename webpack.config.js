const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3.6.4",
                    targets: {
                      chrome: "87"
                    }
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: ["babel-plugin-styled-components"]
            }
          },
          "ts-loader"
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/
      }
      // {
      //   test: /\.json$/,
      //   loader: "json-loader",
      //   exclude: /node_modules/
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8000,
    overlay: true,
    open: true,
    hot: true,
    proxy: [
      {
        context: ["/tft/summoner", "/tft/league"],
        target: "https://kr.api.riotgames.com",
        changeOrigin: true
      },
      {
        context: ["/tft/match"],
        target: "https://asia.api.riotgames.com",
        changeOrigin: true
      },
      {
        context: ["/cdn"],
        target: "http://ddragon.leagueoflegends.com",
        changeOrigin: true
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  devtool: "inline-source-map",
  mode: "development"
};
