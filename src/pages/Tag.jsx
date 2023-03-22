import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { __getCategoryRadio } from '../redux/module/getRadioCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import RadioContainer from '../components/RadioContainer';
import Navbar from '../components/Navbar';
import { AiOutlineArrowUp, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Lnb from '../components/Lnb';
import { StRadioContainer } from '../pages/Home';
import useScroll from '../hooks/useScroll';
import Button from '../elements/Button';

function Tag() {
    let { id } = useParams();
    const page = useRef(1);
    const [ref, inView] = useInView();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.gettingRadioCategory);

    useEffect(() => {
        dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
    }, []);

    useEffect(() => {
        if (inView) {
            page.current += 1;
            dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
        }
    }, [inView]);

    const [isLnbOpen, setIsLnbOpen] = useState(false);

    const toggleLnb = () => {
        setIsLnbOpen(!isLnbOpen);
    };
    const handleItemClick = () => {
        setIsLnbOpen(false);
    };

    const radioContainerRef = useRef();
    const scrollPos = useScroll(radioContainerRef);
    const topBtnHandler = () => {
        radioContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Lnb isOpen={isLnbOpen} handleItemClick={handleItemClick} />
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
                <div ref={ref}>
                    <p>마지막 페이지 입니다.</p>
                </div>
            </StRadioContainer>
            {scrollPos > 10 && (
                <Button TopBtn onClick={topBtnHandler}>
                    <AiOutlineArrowUp size={15} />
                </Button>
            )}
        </>
    );
}

export default Tag;
