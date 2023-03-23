import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Navbar({ iconleft, title, iconright, toNavigate, toClose }) {
    const navigate = useNavigate();

    return (
        <NavbarBox>
            <NavbarCursor
                onClick={() => {
                    document.startViewTransition(() => navigate(toNavigate));
                }}
            >
                {iconleft}
            </NavbarCursor>
            <div>
                <span>{title}</span>
            </div>
            <NavbarCursor
                onClick={() => {
                    document.startViewTransition(() => navigate(toClose));
                }}
            >
                {iconright}
            </NavbarCursor>
        </NavbarBox>
    );
}

export default Navbar;

const NavbarBox = styled.div`
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    min-height: 3.125rem;
    margin-top: 2.5rem;
`;

const NavbarCursor = styled.div`
    cursor: pointer;
`;
