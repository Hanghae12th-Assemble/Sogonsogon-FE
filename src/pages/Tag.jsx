import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { __getCategoryRadio } from '../redux/module/getRadioCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import RadioContainer from '../components/RadioContainer';

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
            dispatch(__getCategoryRadio({ page: page.current }));
        }
    }, [inView]);

    return (
        <div>
            {data?.radio.map((item) => {
                return <RadioContainer radio={item?.data} />;
            })}
        </div>
    );
}

export default Tag;
