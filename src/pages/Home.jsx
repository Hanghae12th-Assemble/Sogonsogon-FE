import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import Navbar from '../components/Navbar';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import RadioContainer from '../components/RadioContainer';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);

    const [isLnbOpen, setIsLnbOpen] = useState(false);

    const toggleLnb = () => {
        setIsLnbOpen(!isLnbOpen);
    };

    const handleItemClick = () => {
        setIsLnbOpen(false);
    };

    const { isLoading, error, radio } = useSelector((state) => {
        return state.gettingRadio;
    });

    if (isLoading) {
        return <div>로딩중입니다</div>;
    }
    if (error) return;

    console.log('radio.data', radio?.data);
    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={handleItemClick} />

            <Navbar
                iconleft={<AiOutlineMenu size={20} onClick={toggleLnb} />}
                title={'sgsg'}
                iconright={<AiOutlineSearch size={20} />}
                toClose={'/'}
            />
            <RadioContainer radio={radio?.data} />
        </>
    );
}

export default Home;
