import React from "react";
import styled from "styled-components";

function ClipCommentList({ props }) {
  const dateTime = props?.createdAt?.replace("T", " ").slice(0, 16);
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
          <p>{props?.content}</p>
        </ClipplayCommentBoxText>
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
