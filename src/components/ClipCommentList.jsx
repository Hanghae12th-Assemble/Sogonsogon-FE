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
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 30px;
  margin-top: 30px;
`;

const ClipplayCommentNameDateBox = styled.div`
  //border: 1px solid black;
  margin-bottom: 15px;
  span {
    color: #77756f;
  }
`;

const ClipplayCommentBoxText = styled.div`
  //border: 1px solid black;
  display: flex;
  align-items: center;
  font-size: 15px;
  p {
    color: #77756f;
  }
`;

const ClipplayPhoto = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 10px;
`;
