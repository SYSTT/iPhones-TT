/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const themeVars = require('../theme.json');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/,
      options: {
        presets: ['@babel/react'],
        plugins: [['import', { libraryName: 'antd', style: true }]],
      },
    },
    {
      test: /\.less$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',

          options: {
            modifyVars: themeVars,
            javascriptEnabled: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    },
  );
  return config;
};
