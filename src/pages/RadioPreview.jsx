import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function RadioPreview() {
    const params = useParams();
    const navigate = useNavigate();
    const { gettingRadio } = useSelector((state) => state);

    const getRadioData = gettingRadio.radio?.data;

    const foundRadio = getRadioData?.find((item) => item.id === Number(params.id));
    return (
        <>
            <RadioPreviewImgContainer backgroundImageUrl={foundRadio?.backgroundImageUrl}>
                <RadioPreviewContainer>
                    <RadioPreviewTopContainer>
                        <AiOutlineArrowLeft
                            cursor={'pointer'}
                            size={25}
                            onClick={() => {
                                document.startViewTransition(() => navigate(-1));
                            }}
                        />
                        Live
                    </RadioPreviewTopContainer>
                    <RadioPreviewBottomContainer>
                        <RadioPreviewProfileContainer>
                            <RadioPreviewProfileLayout>
                                <RadioPreviewProfileImg />
                                <RadioPreviewPfContentContainer>
                                    {' '}
                                    <RadioPreviewProfileNicknameLayout>
                                        닉네임
                                    </RadioPreviewProfileNicknameLayout>
                                    <RadioPreviewProfileTitleLayout>
                                        {foundRadio?.title}
                                    </RadioPreviewProfileTitleLayout>
                                </RadioPreviewPfContentContainer>
                            </RadioPreviewProfileLayout>
                            <LayoutContainer>
                                <LayoutBox />
                                <LayoutBox2>
                                    <LayoutBox3>
                                        <div>시청자수:30</div>
                                        <div>방송시간 05:30</div>
                                    </LayoutBox3>
                                    <div>{foundRadio?.introduction}</div>
                                </LayoutBox2>
                            </LayoutContainer>
                        </RadioPreviewProfileContainer>
                        <JoinRadioBtn>입장하기</JoinRadioBtn>
                    </RadioPreviewBottomContainer>
                </RadioPreviewContainer>
            </RadioPreviewImgContainer>
        </>
    );
}

export default RadioPreview;

const RadioPreviewImgContainer = styled.div`
    height: 100%;
    padding: 40px 25px 25px 25px;
    position: relative;
    border-radius: 15px;
    opacity: 0.9;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: flex-end;
    display: flex;
    flex-direction: row-reverse;
`;

const RadioPreviewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const RadioPreviewTopContainer = styled.div`
    width: 100%;
    height: 50px;
    color: #ffffffa2;
    padding: 0px 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #9c949490;
`;

const RadioPreviewBottomContainer = styled.div`
    width: 100%;
    height: 400px;
    border-radius: 15px;
    background-color: #9c949490;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const RadioPreviewProfileContainer = styled.div`
    width: 100%;
    min-height: 250px;
    color: white;
`;

const RadioPreviewProfileLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
`;

export const RadioPreviewProfileImg = styled.div`
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 100%;
    margin: 0px 20px 0px 20px;
    opacity: 0.9;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: flex-end;
    display: flex;
    flex-direction: row-reverse;
    transition: all 0.5s ease-in-out 0s;
    :hover {
        transform: scale(1);
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out 0s;
    }
`;

const RadioPreviewPfContentContainer = styled.div`
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const RadioPreviewProfileNicknameLayout = styled.div`
    width: 100%;
    min-height: 25px;
    font-size: 15px;
    font-weight: 80;
    display: flex;
    align-items: center;
`;

const RadioPreviewProfileTitleLayout = styled.div`
    width: 100%;
    min-height: 25px;
    font-size: 20px;
    display: flex;
    font-weight: bold;
    align-items: center;
`;

const LayoutContainer = styled.div`
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: row;
`;

const LayoutBox = styled.div`
    width: 112px;
    min-height: 150px;
`;

const LayoutBox2 = styled.div`
    width: 336px;
    min-height: 150px;
    font-size: 12px;
`;

const LayoutBox3 = styled.div`
    width: 100%;
    min-height: 50px;
    font-size: 12px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const JoinRadioBtn = styled(Link)`
    position: relative;
    width: 390px;
    height: 50px;
    background-color: #ff9900;
    font-weight: bold;
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
