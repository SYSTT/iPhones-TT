const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const rewireStyledComponents = require('react-app-rewire-styled-components');

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
    modifyVars: {
      '@primary-color': '#CE1126',
      '@link-color': '#CE1126',
      '@error-color': '#ffbabe',
    },
  }),
  styledComponents({
    displayName: (process.env.NODE_ENV !== "production"),
  }),
);
