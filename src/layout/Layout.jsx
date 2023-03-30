import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <LayoutBox>
        <TeamInfo>
          <TeamInfoTest></TeamInfoTest>
        </TeamInfo>
        <Box>
          <DivLayout2>{children}</DivLayout2>
        </Box>
      </LayoutBox>
    </>
  );
};

const LayoutBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Box = styled.div`
  display: flex;
  margin-left: 20%;
  justify-content: center;
  box-shadow: 0 0.3125rem 1.125rem -0.4375rem rgba(0, 0, 0, 0.4);
  z-index: 1;
  @media screen and (max-width: 1000px) {
    margin: 0 auto;
  }
  @media screen and (max-width: 625px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const TeamInfo = styled.div`
  position: fixed;
  bottom: 3.125rem;
  left: 12.5rem;
  @media screen and (max-width: 625px) {
    display: none;
  }
`;

const TeamInfoTest = styled.div`
  display: flex;
  width: 20.5rem;
  justify-content: space-around;
`;

const DivLayout2 = styled.div`
  @media screen and (max-width: 420px) {
    width: 100%;
    margin: auto;
  }
  //border: 1px solid black;
  width: 31.25rem;
  height: 100vh;
  position: absolute;
  margin-left: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0 0.3125rem 1.125rem -0.4375rem rgba(0, 0, 0, 0.4);
`;

export default Layout;
