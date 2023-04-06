import React from "react";
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";

function ClipPlayComment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <ClipplayCommentBox>
      <ClipplayCommentTitle>
        <span>댓글 </span>
        <ClipplayCommentCount>3</ClipplayCommentCount>
      </ClipplayCommentTitle>
      <div>
        <ClipplayInputTitle>
          <span>전체 댓글</span>
          <span> 3</span>
        </ClipplayInputTitle>
        <div>
          <ClipplayInputForm>
            <Input
              commentInput
              register={register}
              type={"text"}
              name={"nickname"}
              placeholder={"댓글을 입력해주세요."}
              validation={{
                required: "댓글을 입력해주세요.",
              }}
            />
            <Button smCommentBtn>등록</Button>
          </ClipplayInputForm>
        </div>
      </div>
      {/* 댓글 박스 시작 */}
      <ClipplayCommentContainner>
        <ClipplayCommentNameDateBox>
          <h3>고은</h3>
          <h4>노래가 좋아요</h4>
          <span>2023.04.04 17:00</span>
        </ClipplayCommentNameDateBox>
        <ClipplayCommentBoxText>
          <div>
            <ClipplayPhoto
              src={
                "https://cdn.pixabay.com/photo/2023/03/28/17/04/woman-7883774_640.jpg"
              }
            />
          </div>
          <p>오늘은 비가 오네요. 비오는 날 어울리는 노래 들려드려요.</p>
        </ClipplayCommentBoxText>
      </ClipplayCommentContainner>
      <ClipplayCommentContainner>
        <ClipplayCommentNameDateBox>
          <h3>양희</h3>
          <h4>노래가 재미있어요.</h4>
          <span>2023.04.05 18:21</span>
        </ClipplayCommentNameDateBox>
        <ClipplayCommentBoxText>
          <div>
            <ClipplayPhoto
              src={
                "https://cdn.pixabay.com/photo/2023/03/28/17/04/woman-7883774_640.jpg"
              }
            />
          </div>
          <p>오늘은 날씨가 맑아요.</p>
        </ClipplayCommentBoxText>
      </ClipplayCommentContainner>
      {/* 댓글 박스 끝 */}
    </ClipplayCommentBox>
  );
}

export default ClipPlayComment;

const ClipplayCommentBox = styled.div`
  //border: 1px solid red;
  height: 600px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  color: black;
  padding: 0 30px;
  overflow-y: auto;
`;

const ClipplayCommentTitle = styled.div`
  //border: 1px solid red;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
  margin-top: 50px;
`;

const ClipplayCommentCount = styled.span`
  color: #ff9900;
  margin-left: 10px;
`;

const ClipplayInputTitle = styled.div`
  //border: 1px solid black;
  margin: 20px 0px;
`;

const ClipplayCommentContainner = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 30px;
  margin-top: 30px;
`;

const ClipplayInputForm = styled.form`
  //border: 1px solid black;
  display: flex;
  justify-content: center;
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
