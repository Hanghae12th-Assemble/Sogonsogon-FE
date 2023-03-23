import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { __getCategoryRadio, initInfinitiScroll } from '../redux/module/getRadioCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import RadioContainer from '../components/RadioContainer';
import Navbar from '../components/Navbar';
import { AiOutlineArrowUp, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import useScroll from '../hooks/useScroll';
import Button from '../elements/Button';
import styled from 'styled-components';

function Tag() {
    let { id } = useParams();
    const page = useRef(1);
    const radioContainerRef = useRef();
    const [ref, inView] = useInView();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.gettingRadioCategory);
    const [isLnbOpen, setIsLnbOpen] = useState(false);
    const scrollPos = useScroll(radioContainerRef);

    const toggleLnb = () => setIsLnbOpen((prev) => !prev);

    useEffect(() => {
        page.current = 1;
        dispatch(initInfinitiScroll());
        dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
    }, [id]);

    useEffect(() => {
        if (inView) {
            page.current += 1;
            dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
        }
    }, [inView]);

    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
            <Navbar
                iconleft={<AiOutlineMenu size={20} onClick={toggleLnb} />}
                title={id}
                iconright={<AiOutlineSearch size={20} />}
                toClose={'/search'}
            />
            <StRadioContainer ref={radioContainerRef}>
                {data?.radio.map((item, index) => {
                    return <RadioContainer radio={item?.data} key={index} />;
                })}
                <div ref={ref}></div>
            </StRadioContainer>
            {scrollPos > 500 && (
                <Button
                    TopBtn
                    onClick={() =>
                        radioContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <AiOutlineArrowUp size={15} />
                </Button>
            )}
        </>
    );
}

export default Tag;

const StRadioContainer = styled.div`
    //border: 1px solid black;
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    flex-direction: row;
    padding: 0px 20px;
    z-index: -1;
    overflow: auto;
`;
