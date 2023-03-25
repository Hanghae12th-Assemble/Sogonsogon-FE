import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function RadioContainer({ props }) {
    const navigate = useNavigate();

    return (
        <>
            <RadioLayout key={props?.id}>
                <RadioImgContainer
                    onClick={() => {
                        document.startViewTransition(() => navigate(`/radiopreview/${props.id}`));
                    }}
                    style={{ backgroundImage: `url(${props?.backgroundImageUrl})` }}
                >
                    <ViewerCounterContainer>
                        <AiOutlineUser size={20} />
                        <ViewerCouterLayout>{props?.enterCnt}명</ViewerCouterLayout>
                    </ViewerCounterContainer>
                </RadioImgContainer>
                <RadioContentLayout>
                    <RadionContentMiniLayout>
                        <RadioTitleLayout to={`/radiopreview/${props?.id}`}>
                            {props?.title}
                        </RadioTitleLayout>

                        <RadioNameLayout
                            onClick={() => {
                                document.startViewTransition(() =>
                                    navigate(`/profile/${props?.membername}`)
                                );
                            }}
                        >
                            {props?.nickname}
                        </RadioNameLayout>
                    </RadionContentMiniLayout>
                </RadioContentLayout>
            </RadioLayout>
        </>
    );
}

export default RadioContainer;

const RadioImgContainer = styled.div`
    min-height: 150px;
    margin-bottom: 10px;
    position: relative;
    background-color: #f5f5f5;
    border-radius: 15px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: flex-end;
    display: flex;
    flex-direction: row-reverse;
    transition: all 0.5s ease-in-out 0s;
    cursor: pointer;
    :hover {
        transform: scale(1.02);
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out 0s;
    }
`;

const RadioLayout = styled.div`
    width: 200px;
    min-height: 220px;
    margin: 10px auto;
`;

const ViewerCounterContainer = styled.div`
    background-color: #6d6d6d;
    width: 80px;
    height: 28px;
    color: white;
    margin: 0px 13px 10px 0px; //  위,오른쪽,아래,왼쪽
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ViewerCouterLayout = styled.div`
    min-width: 45px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RadioContentLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* border: 1px solid black; */
`;

const RadioTitleLayout = styled(Link)`
    font-size: 14px;
    font-weight: bold;
    padding-left: 5px;
    line-height: 1.5;
    /* border: 1px solid black; */
`;

const RadioNameLayout = styled.div`
    width: 145px;
    min-height: 20px;
    padding: 5px 0px 0px 0px;
    font-size: 12px;
    padding-left: 5px;
    color: #6d6d6d;
    cursor: pointer;
`;

const RadionContentMiniLayout = styled.div`
    width: 150px;
    min-height: 50px;
    /* border: 1px solid black; */
`;
