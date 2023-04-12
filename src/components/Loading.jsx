import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { ReactComponent as Logooutdot } from "../asset/logo/logowithoutdot.svg";
import styled from "styled-components";

function App() {
  let [loading] = useState(true);
  let [color] = useState("white");

  return (
    <SynLoading>
      <Logooutdot />
      <SynLoader
        color={color}
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </SynLoading>
  );
}

export default App;

const SynLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SynLoader = styled(SyncLoader)`
  position: absolute;
`;
