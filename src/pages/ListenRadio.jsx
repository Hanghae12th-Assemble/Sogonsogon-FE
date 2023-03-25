import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function ListenRadio() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { gettingRadio } = useSelector((state) => state);

    const getRadioData = gettingRadio?.radio?.map((item) => item.data.result.map((i) => i));

    const radioData = getRadioData?.map((item, i) => item.find((i) => i.id === Number(id)));
    const foundRadio = radioData.filter((item) => {
        if (item !== undefined) {
            return item;
        }
    });
    return (
        <LSRadio>
            <LSRadioTopBox backgroundImageUrl={foundRadio[0]?.backgroundImageUrl}>
                <LSRadioTop>
                    <LsRadioTopLayout>
                        <LSRadioTopLive>
                            <span>Live</span>
                        </LSRadioTopLive>
                        <LSRadioTopMember>
                            <span>30</span>
                        </LSRadioTopMember>
                    </LsRadioTopLayout>
                    <LsRadioTopLayout>
                        <LSRadioTopNotice>공지</LSRadioTopNotice>
                        <AiOutlineClose
                            size={20}
                            cursor={'pointer'}
                            onClick={() => {
                                document.startViewTransition(() => navigate('/'));
                            }}
                        />
                    </LsRadioTopLayout>
                </LSRadioTop>
                <LSRadioProfileContainer>
                    <LsProfileLayout>
                        {' '}
                        <LSRadioTopTitlePhoto></LSRadioTopTitlePhoto>
                        <span>{foundRadio[0]?.nickname}</span>
                    </LsProfileLayout>
                    <LSRadioTopTitle>
                        <span>{foundRadio[0]?.title}</span>
                    </LSRadioTopTitle>
                </LSRadioProfileContainer>
                <LsCenterDiv />
            </LSRadioTopBox>
            <LSRadioChattingBox>
                <LsBottomContainer>
                    <LsInputContainer>
                        <input placeholder="대화를 나눠보세요" />
                        <button>전송</button>
                    </LsInputContainer>
                </LsBottomContainer>
            </LSRadioChattingBox>
        </LSRadio>
    );
}

export default ListenRadio;

const LSRadio = styled.div`
    /* border: 1px solid blue; */
    height: 100%;

    border-radius: 15px;

    display: flex;
    flex-direction: column;
`;

const LSRadioTopBox = styled.div`
    position: relative;
    opacity: 0.8;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* border: 1px solid black; */
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    background-color: #dddcdc;
`;

const LSRadioTop = styled.div`
    /* border: 1px solid red; */
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 25px 0px 25px;
`;
const LsRadioTopLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const LSRadioTopLive = styled.div`
    border: 1px solid black;
    width: 50px;
    height: 30px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const LSRadioTopMember = styled(LSRadioTopLive)`
    margin-left: 10px;
`;

const LSRadioTopNotice = styled.div`
    border: 1px solid black;
    width: 50px;
    height: 30px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

const LSRadioTopTitle = styled.div`
    /* border: 1px solid black; */
    display: flex;
    padding: 5px 25px 20px 25px;
    font-size: 20px;
    font-weight: bold;
`;

const LSRadioTopTitlePhoto = styled.div`
    /* border: 1px solid black; */
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: #c8bebe;
`;

const LSRadioProfileContainer = styled.div`
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    border-radius: 25px 25px 0px 0px;
    margin-top: 150px;
`;

const LsProfileLayout = styled.div`
    /* border: 1px solid black; */
    padding: 15px 25px 10px 25px;
    display: flex;
    flex-direction: row;
    span {
        margin-left: 10px;
        display: flex;
        align-items: center;
    }
`;

const LsCenterDiv = styled.div`
    width: 100%;
    height: 10px;
    background-color: #dddcdc;
`;

const LSRadioChattingBox = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    height: 65%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const LsBottomContainer = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    padding: 5px 25px 20px 25px;
`;

const LsInputContainer = styled.label`
    position: relative;
    input {
        width: 300px;
        height: 40px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border: none;
        border-radius: 25px;
        outline: none;
        font-size: 15px;
        padding-left: 20px;
    }
    button {
        position: absolute;
        top: 0;
        right: 6px;
        border-radius: 25px;
        font-size: 10px;
        width: 40px;
        height: 25px;
        border: none;
        background-color: #ff5b0d;
        color: white;
        cursor: pointer;
    }
`;
