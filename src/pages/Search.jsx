import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Navbar from '../components/Navbar';

function Search() {
    return (
        <>
            <Navbar
                toNavigate={'/'}
                iconleft={<AiOutlineArrowLeft size={20} />}
                title={'검색페이지'}
            />

            <div>Search</div>
        </>
    );
}

export default Search;
