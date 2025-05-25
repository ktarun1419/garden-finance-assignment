// src/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle `

  @font-face {
    font-family: 'Circular Std';
    src: url('/fonts/CircularStd-Book.ttf') format('truetype');
  };

  /* Box sizing and reset of margins/paddings */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Base body styles */
  body {
    font-family: 'Circular Std', sans-serif;
    color: #212121;
    background: #ffff
    line-height: 1.5;
    padding: 1.5rem;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 18px;
    line-height: 100%;
    font-weight: 400;
  }

  /* Buttons */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
`;
export default GlobalStyles;
