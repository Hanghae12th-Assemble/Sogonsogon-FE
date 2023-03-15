import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRadio } from '../redux/module/getRadio';
import styled from 'styled-components';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getRadio());
    }, [dispatch]);

    const { isLoading, error, radio } = useSelector((state) => {
        return state.gettingRadio;
    });

    console.log('radio.data', radio?.data);
    return (
        <>
            {radio.data &&
                radio.data.map((item) => {
                    return (
                        <div key={item.id}>
                            <ItemsImgContainer>
                                <img src={item.backgroundImageUrl} alt="" />
                            </ItemsImgContainer>
                            <div>{item.title}</div>
                        </div>
                    );
                })}
        </>
    );
}

export default Home;

const ItemsImgContainer = styled.div`
    height: 320px;
    overflow: hidden;
    position: relative;
    background-color: #f5f5f5;
    border-radius: 1rem;
    > img {
        position: static; // position 수정
        width: 100%;
        height: 100%;
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
