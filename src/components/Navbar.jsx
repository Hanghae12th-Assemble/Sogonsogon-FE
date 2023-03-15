import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";

function Navbar({ iconleft, title, iconright }) {
  return (
    <NavbarBox>
      <div>{iconleft}</div>
      <div>
        <span>{title}</span>
      </div>
      <div>{iconright}</div>
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
