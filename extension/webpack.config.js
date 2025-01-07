const path = require("path");

module.exports = {
  entry: {
    contentScript: "./contentScript.js",
    popup: "./popup.js",
    button: "./functions/button.js",
    jobs: "./functions/jobs.js",
    utils: "./functions/utils.js",
  },
  output: {
    filename: "[name].bundle.js", // [name] will be replaced by the entry point name
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development",
  devtool: "source-map", // Use source-map instead of eval-source-map
};
