import Router from "./shared/Router";
import Layout from "./layout/Layout";
import Reset from "./styles/Reset";
import theme from "./styles/theme";
import GlobalStyle from "./styles/Globalstyle";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
