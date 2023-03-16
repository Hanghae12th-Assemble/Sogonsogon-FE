import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import Navbar from '../components/Navbar';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import RadioContainer from '../components/RadioContainer';

function Home() {
    const radio = {
        data: [
            {
                id: 1,
                title: '봄이 다가오는 설렘을 안고',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 2,
                title: '지친 마음을 달래며',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2017/07/11/20/31/swan-2494925_960_720.jpg',
            },
            {
                id: 3,
                title: '일상 얘기 나눠요',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2023/02/17/19/59/dog-7796822_960_720.jpg',
            },
            {
                id: 4,
                title: 'ASMR',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2023/02/08/07/32/vietnamese-woman-7775904_960_720.jpg',
            },
            {
                id: 5,
                title: '여행지 추천 부탁드립니다!',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2023/01/24/10/30/gearstick-7740670_960_720.jpg',
            },
            {
                id: 6,
                title: '같이 노래나 듣죠',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2023/01/29/00/16/drums-7751985_960_720.jpg',
            },
            {
                id: 7,
                title: '같이 책 읽어요',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2023/01/29/19/31/mazarine-blue-7753988_960_720.jpg',
            },
            {
                id: 8,
                title: '멍멍멍멍',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/11/12/38/french-bulldog-7514203_960_720.jpg',
            },
        ],
    };

    console.log(radio);

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

    // const { isLoading, error, radio } = useSelector((state) => {
    //     return state.gettingRadio;
    // });

    // console.log('radio.data', radio?.data);
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
