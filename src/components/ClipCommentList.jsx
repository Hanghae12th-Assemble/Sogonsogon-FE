import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clickModi } from "../redux/module/reduxState/clickModiComment";
import { __removeAudioComment } from "../redux/module/removeAudioComment";

function ClipCommentList({ props, title, id }) {
  const dateTime = props?.createdAt?.replace("T", " ").slice(0, 16);
  const modiComment = useSelector((state) => state?.clickingModiComment);
  const dispatch = useDispatch();

  const ModifyCommnet = (id) => {
    dispatch(clickModi({ modi: !modiComment.modi, id }));
  };

  const removeComment = (id) => {
    dispatch(__removeAudioComment(id));
  };

  return (
    <>
      <ClipplayCommentContainner>
        <ClipplayCommentNameDateBox>
          <h3>{props?.membername}</h3>
          <h4>{props?.content}</h4>
          <span>{dateTime}</span>
        </ClipplayCommentNameDateBox>
        <ClipplayCommentBoxText>
          <div>
            <ClipplayPhoto src={props?.memberImageUrl} />
          </div>
          <p>{title}</p>
        </ClipplayCommentBoxText>
        <ClipplayCommentBoxBtn>
          <ClipplayCommentModiRemove>
            <span onClick={() => ModifyCommnet(id)}>수정</span>
          </ClipplayCommentModiRemove>
          <ClipplayCommentModiRemove>
            <span onClick={() => removeComment(id)}>삭제</span>
          </ClipplayCommentModiRemove>
        </ClipplayCommentBoxBtn>
      </ClipplayCommentContainner>
    </>
  );
}

export default ClipCommentList;

const ClipplayCommentContainner = styled.div`
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.2);
  padding-bottom: 1.875rem;
  margin-top: 1.875rem;
`;

const ClipplayCommentNameDateBox = styled.div`
  margin-bottom: 0.9375rem;
  span {
    color: #77756f;
  }
`;

const ClipplayCommentBoxText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  p {
    color: #77756f;
  }
`;

const ClipplayPhoto = styled.img`
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 0.625rem;
  margin-right: 0.625rem;
`;

const ClipplayCommentBoxBtn = styled.div`
  //border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

const ClipplayCommentModiRemove = styled.div`
  margin-left: 20px;
  span {
    cursor: pointer;
  }
`;
