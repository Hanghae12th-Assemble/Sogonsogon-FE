import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import styled from 'styled-components';

function Home() {
    const radio = {
        data: [
            {
                id: 1,
                title: '라디오1',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 2,
                title: '라디오2',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 3,
                title: '라디오3',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 4,
                title: '라디오4',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 5,
                title: '라디오5',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 6,
                title: '라디오6',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 7,
                title: '라디오7',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
            {
                id: 8,
                title: '라디오8',
                backgroundImageUrl:
                    'https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg',
            },
        ],
    };

    console.log(radio);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);

    // const { isLoading, error, radio } = useSelector((state) => {
    //     return state.gettingRadio;
    // });

    // console.log('radio.data', radio?.data);
    return (
        <>
            {radio?.data && (
                <RadioContainer>
                    {radio.data.map((item) => {
                        return (
                            <RadioLayout key={item.id}>
                                <ItemsImgContainer>
                                    <img src={item.backgroundImageUrl} alt="" />
                                </ItemsImgContainer>
                                <div>{item.title}</div>
                            </RadioLayout>
                        );
                    })}
                </RadioContainer>
            )}
        </>
    );
}

export default Home;

const ItemsImgContainer = styled.div`
    height: 180px;
    overflow: hidden;
    position: relative;
    background-color: #f5f5f5;
    border-radius: 1rem;
    > img {
        position: static; // position 수정
        width: 100%;
        height: 180px;
        margin: auto;
        object-fit: cover;
        background-color: #f5f5f5;
        transition: all 0.5s ease-in-out 0s;
        :hover {
            transform: scale(1.02);
            transition: all 0.3s ease-in-out 0s;
        }
    }
`;

const RadioContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    flex-wrap: wrap;
`;
const RadioLayout = styled.div`
    /* border: 1px solid black; */
    width: 200px;
    height: 200px;
    margin: 10px auto;
`;
