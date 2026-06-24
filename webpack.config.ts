/* eslint-disable import/no-anonymous-default-export */
import path from 'path';

export default {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  modules: [
    'node_modules'
  ]
};
