import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { __getCategoryRadio } from "../redux/module/getRadioCategory";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import RadioContainer from "../components/RadioContainer";
import styled from "styled-components";

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

  return (
    <div>
      {data?.radio.map((item, index) => {
        return item?.data?.map((items) => {
          console.log(items);
        });
      })}
      <div ref={ref}>
        <p>마지막 페이지 입니다.</p>
      </div>
    </div>
  );
}

export default Tag;
