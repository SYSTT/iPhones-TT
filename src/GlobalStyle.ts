import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap');
  
  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1 {
    font-size: 24px;
    line-height: 36px;
    font-weight: 600;
    color: black;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;
export default GlobalStyle;
