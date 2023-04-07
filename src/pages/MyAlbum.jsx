import React, { useState } from 'react'
import Lnb from '../components/Lnb'
import Navbar from '../components/Navbar'
import { NavbarContainer } from './Home'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
import MyContentEditContainer from '../components/MyContentEditContainer'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { ReactComponent as Music } from '../asset/icon/music.svg';
import SelectBtnContainer from '../components/SelectBtnContainer'
import SelectedContentRemoveBtn from '../components/SelectedContentRemoveBtn';
import { useNavigate } from 'react-router-dom'

function MyAlbum() {
    const navigate = useNavigate()
    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const toggleLnb = () => setIsLnbOpen((prev) => !prev);
    const [state, setState] = useState({
        editClicked: false,
        selectedContent: [],
    });

    const { editClicked, selectedContent } = state;

    const totalAlbumCount = [1, 2]
    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
            <NavbarContainer>
                <Navbar
                    iconleft={<AiOutlineMenu size={30} onClick={toggleLnb} />}
                    title={"내 앨범"}
                    iconright={<AiOutlinePlus size={30} />}
                    toClose={"/createaudio"}
                />
            </NavbarContainer>
            <MyContentEditContainer
                editClicked={editClicked}
                contentType={totalAlbumCount}
                selectedContent={selectedContent}
                frontSubstance={"전체 앨범"}
                setEditClicked={(value) => setState({ ...state, editClicked: value })}
            />
            <MyAlbumContainer>
                <MyAlbumLayout>
                    <MyAlbumDescContainer >
                        <SelectBtnContainer
                            editClicked={editClicked}
                            state={state}
                            setState={setState}
                            selectedContent={selectedContent}
                        // contentId={item.notificationId}
                        />
                        <MyAlbumImg />
                        <MyAlbumDescLayout onClick={() => {
                            document.startViewTransition(() => navigate(`/albumdetail/1`));
                        }}>
                            <MyAlbumTitleLayout>좋은 음악을 같이 들어요.</MyAlbumTitleLayout>
                            <MyAlbumDateLayout>2023.12.23</MyAlbumDateLayout>
                            <MyAlbumHeartContianer>
                                <AiOutlineHeart size={18} color={"77756f"} />
                                <div>106</div>
                            </MyAlbumHeartContianer>
                        </MyAlbumDescLayout>
                    </MyAlbumDescContainer>
                    <StIconSvg><Music /></StIconSvg>
                </MyAlbumLayout>
            </MyAlbumContainer>
            <SelectedContentRemoveBtn
                state={state}
                setState={setState}
                selectedContent={selectedContent}
            // __removeContent={__removeAlarm}
            />
        </>
    )
}

export default MyAlbum

const MyAlbumContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`

const MyAlbumLayout = styled.div`
    border-top: 1px solid #f0efed;
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
    cursor: pointer;

`

const MyAlbumImg = styled.div`
    min-width: 75px;
    max-height: 75px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 10px;
    margin: 0px 20px 0px 10px;
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
const StIconSvg = styled(Music)`
    width: 20px;
`