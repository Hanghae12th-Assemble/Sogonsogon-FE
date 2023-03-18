import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import Navbar from '../components/Navbar';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import RadioContainer from '../components/RadioContainer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);
    const { isLoading, error, radio } = useSelector((state) => {
        return state.gettingRadio;
    });
    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const toggleLnb = () => {
        setIsLnbOpen(!isLnbOpen);
    };
    const handleItemClick = () => {
        setIsLnbOpen(false);
    };

    if (isLoading) {
        return <div>로딩중입니다</div>;
    }
    if (error) return;
    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={handleItemClick} />

            <Navbar
                iconleft={<AiOutlineMenu size={20} onClick={toggleLnb} />}
                title={'소곤소곤'}
                iconright={<AiOutlineSearch size={20} />}
                toClose={'/search'}
            />
            <RadioContainer radio={radio?.data} />
            <AddRadioBtn to={'/createradio'}>방송하기</AddRadioBtn>
        </>
    );
}

export default Home;
const AddRadioBtn = styled(Link)`
    position: absolute;
    width: 444px;
    height: 50px;
    background-color: black;
    color: white;
    border-radius: 10px;
    font-size: 22px;
    bottom: 40px;
    left: 28px;
    z-index: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
