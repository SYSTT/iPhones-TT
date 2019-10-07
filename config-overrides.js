const { override, fixBabelImports } = require('customize-cra');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const styledComponents = obj => config => {
  config = rewireStyledComponents(config, process.env.NODE_ENV, obj);
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  styledComponents({
    displayName: (process.env.NODE_ENV !== "production")
  }),
);
