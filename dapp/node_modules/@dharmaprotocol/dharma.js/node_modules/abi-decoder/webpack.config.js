module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/abi-decoder.js',
    libraryTarget: 'umd',
    library: 'abiDecoder',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
