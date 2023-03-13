import Router from "./shared/Router";
import Layout from "./layout/Layout";
import Reset from "./styles/Reset";
import GlobalStyle from "./styles/Globalstyle";

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
