import Router from "./shared/Router";
import Layout from "./layout/Layout";
import Reset from "./styles/reset";

function App() {
  return (
    <>
      <Reset />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
