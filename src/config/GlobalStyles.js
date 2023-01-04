import { createGlobalStyle, css } from 'styled-components'


const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #root {
    background-color: #F8F9FA;
    height: 100vh;

  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body {
    font: 300 13px/1.2, sans-serif;
    font-family: 'Open Sans', sans-serif;
    overflow-x: hidden !important;
    scroll-behavior: smooth;
    background-color: #FAFAFA;

    ${props => props.themes === 'dark' && css`
      background-color: #0C0C0C;
    `}
}

  input:not([type="checkbox"]),
  input:-internal-autofill-selected,
  input:-webkit-autofill {
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-box-shadow: none;
    appearance: none;
    background: none;
    box-shadow: none;
    outline: none;
  }

  input[type="text"] {
    background: #fff;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  h1, h2, h3, h4 ,h5, h6 {
    line-height: 1.2;
    margin-bottom: .9em;
  }

  p {
    line-height: 1.25;
  }

  h1, h2, h3, h4 ,h5, h6,
  p {
    margin: 0;
  }

  fieldset {
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
`

export default GlobalStyles
