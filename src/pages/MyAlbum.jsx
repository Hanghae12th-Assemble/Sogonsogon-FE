import React, { useState } from 'react'
import Lnb from '../components/Lnb'
import Navbar from '../components/Navbar'
import { NavbarContainer } from './Home'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
function MyAlbum() {
    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const toggleLnb = () => setIsLnbOpen((prev) => !prev);

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
        </>
    )
}

export default MyAlbum