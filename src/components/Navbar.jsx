import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navbar({ iconleft, title, iconright, toNavigate, toClose }) {
  const navigate = useNavigate();

  return (
    <NavbarBox>
      <div
        onClick={() => {
          document.startViewTransition(() => navigate(toNavigate));
        }}
      >
        {iconleft}
      </div>
      <div>
        <span>{title}</span>
      </div>
      <div
        onClick={() => {
          document.startViewTransition(() => navigate(toClose));
        }}
      >
        {iconright}
      </div>
    </NavbarBox>
  );
}

export default Navbar;

const NavbarBox = styled.div`
  //border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  min-height: 3.125rem;
  margin-top: 2.5rem;
`;
