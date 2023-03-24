import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function RadioPreview() {
    const params = useParams();
    const navigate = useNavigate();
    const { gettingRadio } = useSelector((state) => state);
    console.log(gettingRadio);

    const getRadioData = gettingRadio.radio?.data;

    const foundRadio = getRadioData?.find((item) => item.id === Number(params.id));
    return (
        <>
            <RadioPreviewImgContainer backgroundImageUrl={foundRadio?.backgroundImageUrl}>
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
                <RadioPreviewPfContainer>
                    <RadioPreviewProfileLayout>
                        <RadioPreviewProfileImg />
                        <RadioPreviewPfContentContainer>
                            {' '}
                            <RadioPreviewProfileNicknameLayout>
                                {foundRadio?.nickname}
                            </RadioPreviewProfileNicknameLayout>
                        </RadioPreviewPfContentContainer>
                    </RadioPreviewProfileLayout>
                </RadioPreviewPfContainer>
            </RadioPreviewImgContainer>
            <RadioPreviewBottomContainer>
                <RadioPreviewBottomLayout>
                    <RadioPreviewContentContainer>
                        <RadioPreviewProfileTitleLayout>
                            {foundRadio?.title}
                        </RadioPreviewProfileTitleLayout>
                        <LayoutContainer>
                            <div>{foundRadio?.introduction}</div>
                        </LayoutContainer>
                    </RadioPreviewContentContainer>
                    <JoinRadioBtn
                        onClick={() => {
                            document.startViewTransition(() => navigate(`/listen/${params.id}`));
                        }}
                    >
                        입장하기
                    </JoinRadioBtn>
                </RadioPreviewBottomLayout>
            </RadioPreviewBottomContainer>
        </>
    );
}

export default RadioPreview;

const RadioPreviewImgContainer = styled.div`
    height: 100%;
    /* padding: 40px 25px 0px 25px; */
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: -1;
`;

const RadioPreviewBottomContainer = styled.div`
    background-color: #010101;
    height: 75%;
    padding: 0px 25px;
    position: relative;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    z-index: 0;
`;

const RadioPreviewTopContainer = styled.div`
    border: 1px solid red;
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

const RadioPreviewBottomLayout = styled.div`
    padding-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const RadioPreviewContentContainer = styled.div`
    background-color: #131312;
    width: 100%;
    min-height: 250px;
    color: white;
    border-radius: 15px;
    padding: 15px 20px 15px 20px;
`;

const RadioPreviewProfileLayout = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
`;

const RadioPreviewProfileImg = styled.div`
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #ffffff;
    border-radius: 100%;
    margin: 0px 20px 0px 0px;
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
    /* border: 1px solid yellow; */
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const RadioPreviewProfileNicknameLayout = styled.div`
    width: 100%;
    color: white;
    min-height: 25px;
    font-size: 20px;
    font-weight: 80;
    display: flex;
    align-items: center;
`;

const RadioPreviewProfileTitleLayout = styled.div`
    width: 100%;
    min-height: 60px;
    font-size: 30px;
    display: flex;
    font-weight: bold;
    align-items: center;
    margin-bottom: 25px;
`;

const LayoutContainer = styled.div`
    background-color: #1e1e1d;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    min-height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const JoinRadioBtn = styled(Link)`
    position: relative;
    width: 450px;
    height: 60px;
    background-color: #ff9900;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    font-size: 22px;
    bottom: 40px;
    left: 0px;
    z-index: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RadioPreviewPfContainer = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: row;
    align-items: flex-end;
    padding: 0px 25px 0px 25px;
    background: linear-gradient(to top, #000000 10%, #0a0a0a 16%, #121212 20%, transparent 60%);
`;
