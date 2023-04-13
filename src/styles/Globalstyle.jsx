import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

*{
    font-family: 'Pretendard-Regular';
}

body{
    overflow:hidden;
}

a {
    color:inherit;
    text-decoration:none;
}

&::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
  }

`;

export default GlobalStyle;
