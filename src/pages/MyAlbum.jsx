import React, { useState } from 'react'
import Lnb from '../components/Lnb'
import Navbar from '../components/Navbar'
import { NavbarContainer } from './Home'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
import MyContentEditContainer from '../components/MyContentEditContainer'
function MyAlbum() {
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
                    toClose={"/search"}
                />
            </NavbarContainer>
            <MyContentEditContainer
                editClicked={editClicked}
                contentType={totalAlbumCount}
                selectedContent={selectedContent}
                frontSubstance={"전체 앨범"}
                setEditClicked={(value) => setState({ ...state, editClicked: value })}

            />
        </>
    )
}

export default MyAlbum