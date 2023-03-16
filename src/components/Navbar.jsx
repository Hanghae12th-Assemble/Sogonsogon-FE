import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar({ iconleft, title, iconright, toNavigate, toClose }) {
  return (
    <NavbarBox>
      <Link to={toNavigate}>
        <div>{iconleft}</div>
      </Link>
      <div>
        <span>{title}</span>
      </div>
      <Link to={toClose}>
        <div>{iconright}</div>
      </Link>
    </NavbarBox>
  );
}

export default Navbar;

const NavbarBox = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 3.125rem;
`;
