import React from 'react'
import styled from 'styled-components';
import SelectBtnContainer from './SelectBtnContainer';
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Music } from '../asset/icon/music.svg';
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";

function AlbumList({ editClicked, state, setState, selectedContent, data }) {
    const navigate = useNavigate()
    const dateTime = data?.createdAt?.replace("T", " ").slice(0, 16);
    const renderIcon = (categoryType) => {
        switch (categoryType) {
            case "음악":
                return (
                    <StIconSvg>
                        <Music />
                    </StIconSvg>
                );
            case "일상":
                return (
                    <StIconSvg>
                        <Daily />
                    </StIconSvg>
                );
            case "도서":
                return (
                    <StIconSvg>
                        <Book />
                    </StIconSvg>
                );
            case "ASMR":
                return (
                    <StIconSvg>
                        <Asmr />
                    </StIconSvg>
                );
            default:
                return null;
        }
    };
    return (
        <>
            <MyAlbumLayout>
                <MyAlbumDescContainer >
                    <SelectBtnContainer
                        editClicked={editClicked}
                        state={state}
                        setState={setState}
                        selectedContent={selectedContent}
                        contentId={data?.id}
                    />
                    <MyAlbumOnclickdiv onClick={() => {
                        document.startViewTransition(() => navigate(`/albumdetail/${data?.id}`));
                    }}>
                        <MyAlbumImg backgroundImageUrl={data?.backgroundImageUrl} />
                        <MyAlbumDescLayout >
                            <MyAlbumTitleLayout>{data?.title}</MyAlbumTitleLayout>
                            <MyAlbumDateLayout>{dateTime}</MyAlbumDateLayout>
                            <MyAlbumHeartContianer>
                                <AiOutlineHeart size={18} color={"77756f"} />
                                <div>{data?.likesCount}</div>
                            </MyAlbumHeartContianer>
                        </MyAlbumDescLayout>
                    </MyAlbumOnclickdiv>
                </MyAlbumDescContainer>
                {renderIcon(data?.categoryType)}
            </MyAlbumLayout>
        </>
    )
}

export default AlbumList


const MyAlbumLayout = styled.div`
    border-bottom: 1px solid #f0efed;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    min-height: 140px;
    padding: 32.5px 30px 10px 20px;
`
const MyAlbumDescContainer = styled.div`
    display: flex;
    flex-direction: row;
   
`
const MyAlbumOnclickdiv = styled.div`
    display: flex;
    flex-direction: row;
     cursor: pointer;
`

const MyAlbumImg = styled.div`
    min-width: 75px;
    max-height: 75px;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 10px;
    margin: 0px 20px 0px 10px;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; 
    transition: all 0.5s ease-in-out 0s;
    :hover {
        transform: scale(1);
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out 0s;
    }
`

const MyAlbumDescLayout = styled.div`
    min-height: 75px;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MyAlbumHeartContianer = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
    align-items: center;

    div{
        margin-left: 5px;
        font-size: 15px;
        color: #77756f;
    }
`
const MyAlbumTitleLayout = styled.div`
    /* border: 1px solid blue; */
    font-size: 20px;
    font-weight: bold;
`
const MyAlbumDateLayout = styled.div`
    font-size: 14px;
    color: #77756f;
    margin: 8px 0px 10px 0px;
`
const StIconSvg = styled.div`
    width: 30px;
`