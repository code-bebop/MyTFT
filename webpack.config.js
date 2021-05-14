const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
      },
      {
        test: /\.(png|svg)$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "public" }]
    }),
    new webpack.EnvironmentPlugin({
      IMG_PUBLIC_PATH: "https://code-bebop.github.io/MyTFT/", // 배포단계에서는 https://code-bebop.github.io/MyTFT/ 로 바꿔줄 것
      RIOT_DDRAGON_CURRENT_VER: "11.10.1"
    })
  ],
  devServer: {
    port: 8000,
    overlay: true,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  devtool: "inline-source-map",
  mode: "development"
};
