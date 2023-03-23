import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import Navbar from '../components/Navbar';
import { AiOutlinePlus, AiOutlineArrowUp, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import RadioContainer from '../components/RadioContainer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import useScroll from '../hooks/useScroll';

function Home() {
    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const radioContainerRef = useRef();
    const scrollPos = useScroll(radioContainerRef);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);

    const { radio } = useSelector((state) => {
        return state.gettingRadio;
    });

    const toggleLnb = () => setIsLnbOpen((prev) => !prev);

    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
            <NavbarContainer>
                <Navbar
                    iconleft={<AiOutlineMenu size={20} onClick={toggleLnb} />}
                    title={'소곤소곤'}
                    iconright={<AiOutlineSearch size={20} />}
                    toClose={'/search'}
                />
            </NavbarContainer>
            <StRadioContainer ref={radioContainerRef}>
                <RadioContainer radio={radio?.data} />
            </StRadioContainer>
            {scrollPos > 500 && (
                <Button
                    TopBtn
                    onClick={() =>
                        radioContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <AiOutlineArrowUp size={20} />
                </Button>
            )}

            <Button
                AddRadioBtn
                onClick={() => {
                    document.startViewTransition(() => navigate('/createradio'));
                }}
            >
                <AiOutlinePlus size={20} />
            </Button>
        </>
    );
}

export default Home;

export const NavbarContainer = styled.div`
    padding: 0px 20px;
`;

// const AddRadioBtn = styled.div`
//     position: absolute;
//     width: 430px;
//     height: 50px;
//     background-color: #ff9900;
//     color: white;
//     border-radius: 10px;
//     bottom: 40px;
//     left: 35px;
//     z-index: 900;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

export const StRadioContainer = styled.div`
    /* border: 1px solid black; */
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    flex-direction: row;
    padding: 0px 20px;
    z-index: -1;
    overflow: auto;
`;
