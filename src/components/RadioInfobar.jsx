import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Person } from '../asset/icon/person.svg';

function RadioInfobar({ props }) {
    const navigate = useNavigate();
    return (
        <>
            <RadioPreviewTopContainer>
                <RaidoPreviewTopLayout>
                    <RaidoPreviewTopInfoLayout>
                        <div>Live</div>
                        <span>05:30</span>
                    </RaidoPreviewTopInfoLayout>

                    <RaidoPreviewTopInfoLayout>
                        <StPersonSVg />7
                    </RaidoPreviewTopInfoLayout>
                </RaidoPreviewTopLayout>
                <RadioPreviwPgCloseBtn>
                    <AiFillCloseCircle
                        color={'#ff601c'}
                        cursor={'pointer'}
                        size={35}
                        onClick={() => {
                            document.startViewTransition(() => navigate(-1));
                        }}
                    />
                </RadioPreviwPgCloseBtn>
            </RadioPreviewTopContainer>
        </>
    );
}

export default RadioInfobar;

const RadioPreviewTopContainer = styled.div`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    padding: 0px 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
`;

const RaidoPreviewTopLayout = styled.div`
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
`;

const RaidoPreviewTopInfoLayout = styled.div`
    padding: 10px;
    font-size: 20px;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    margin-right: 10px;
    background-color: #262524;
    color: white;
    div {
        width: 40px;
        height: 22px;
        font-size: 14px;
        border-radius: 20px;
        margin-right: 5px;
        display: flex;
        align-items: center;
        background-color: #ff601c;
        justify-content: center;
    }
`;

const RadioPreviwPgCloseBtn = styled.div`
    margin-right: 20px;
    z-index: 1;
`;

const StPersonSVg = styled(Person)`
    width: 17px;
    margin-right: 7px;
`;
