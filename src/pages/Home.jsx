import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import Navbar from '../components/Navbar';
import { AiOutlineArrowUp, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import RadioContainer from '../components/RadioContainer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import useScroll from '../hooks/useScroll';

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);

    const { radio } = useSelector((state) => {
        return state.gettingRadio;
    });

    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const radioContainerRef = useRef();
    const scrollPos = useScroll(radioContainerRef);
    const topBtnHandler = () => {
        radioContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleLnb = () => {
        setIsLnbOpen(!isLnbOpen);
    };

    const handleItemClick = () => {
        setIsLnbOpen(false);
    };

    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={handleItemClick} />

            <Navbar
                iconleft={<AiOutlineMenu size={20} onClick={toggleLnb} />}
                title={'소곤소곤'}
                iconright={<AiOutlineSearch size={20} />}
                toClose={'/search'}
            />
            <StRadioContainer ref={radioContainerRef}>
                {' '}
                <RadioContainer radio={radio?.data} />
            </StRadioContainer>
            {scrollPos > 10 && (
                <Button TopBtn onClick={topBtnHandler}>
                    <AiOutlineArrowUp size={15} />
                </Button>
            )}

            <AddRadioBtn to={'/createradio'}>방송하기</AddRadioBtn>
        </>
    );
}

export default Home;
const AddRadioBtn = styled(Link)`
    position: absolute;
    width: 430px;
    height: 50px;
    background-color: #ff9900;
    color: white;
    border-radius: 10px;
    font-size: 22px;
    bottom: 40px;
    left: 35px;
    z-index: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

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
    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`;
