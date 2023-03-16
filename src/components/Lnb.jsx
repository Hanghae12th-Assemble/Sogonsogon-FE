import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Lnb({ isOpen, handleItemClick }) {
    const [items, setItems] = useState([
        { id: 1, name: '홈', link: '/' },
        { id: 2, name: '음악', link: '/' },
        { id: 3, name: '일상', link: '/' },
        { id: 4, name: '도서', link: '/' },
        { id: 5, name: 'ASMR', link: '/' },
    ]);

    return (
        <LnbLayout isOpen={isOpen}>
            <button onClick={handleItemClick}>닫기</button>
            <LnbMenuLayout isOpen={isOpen}>
                {items.map((item) => (
                    <div key={item.id}>
                        <Link to={item.link} onClick={handleItemClick}>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </LnbMenuLayout>
        </LnbLayout>
    );
}

export default Lnb;

const LnbLayout = styled.div`
    width: ${({ isOpen }) => (isOpen ? '350px' : '0px')};
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    transition: width 0.3s ease;
    background-color: white;
    border: 1px solid black;
    z-index: 999px;
    margin-top: 40px;
`;
const LnbMenuLayout = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    height: 100%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    a {
        display: block;
        margin-bottom: 10px;
        color: #333;
        text-decoration: none;
    }
`;
