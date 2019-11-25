/* eslint-disable @typescript-eslint/no-var-requires */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const themeVars = require('./theme.json');

const styledComponents = obj => config => {
  config = rewireStyledComponents(config, process.env.NODE_ENV, obj);
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVars,
  }),
  styledComponents({
    displayName: process.env.NODE_ENV !== 'production',
  }),
);
