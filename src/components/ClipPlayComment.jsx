import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __createAudioComment } from "../redux/module/createAudioComment";
import {
  __getAudioComment,
  initInfinitiScroll,
} from "../redux/module/getAudioComment";
import { clickOut } from "../redux/module/reduxState/clickShutDown";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ClipCommentList from "./ClipCommentList";

function ClipPlayComment() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [isVisible] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView();
  const { id } = useParams();
  const commentlist = useSelector((state) => state?.gettingAudioComment);
  const commentPost = useSelector((state) => state.creatingAudioComment);

  const clickModalOut = (e) => {
    dispatch(clickOut(false));
  };

  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getAudioComment({ audioId: id, page: page.current }));
  }, [commentPost]);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getAudioComment({ audioId: id, page: page.current }));
    }
  }, [inView]);

  const submitForm = (data) => {
    dispatch(
      __createAudioComment({
        audioId: id,
        commentInfo: { content: data.content },
      })
    );
    reset();
  };

  return (
    <>
      <CommentBoxLayer onClick={clickModalOut} />
      <ClipplayCommentBox isVisible={isVisible}>
        <ClipplayCommentTitle>
          <span>댓글 </span>
        </ClipplayCommentTitle>
        <div>
          <ClipplayInputTitle>
            <span>전체 댓글</span>
            <span>{commentlist?.comment[0]?.metadata?.audioClipCount}</span>
          </ClipplayInputTitle>
          <div>
            <ClipplayInputForm onSubmit={handleSubmit(submitForm)}>
              <Input
                commentInput
                register={register}
                type={"text"}
                name={"content"}
                placeholder={"댓글을 입력해주세요."}
                validation={{
                  required: "댓글을 입력해주세요.",
                }}
              />
              <Button smCommentBtn>등록</Button>
            </ClipplayInputForm>
          </div>
        </div>
        <ClipPlayCommentOverflow>
          {commentlist?.comment?.map((item, index) => {
            return item?.result?.map((item, index) => {
              return <ClipCommentList props={item} key={index} />;
            });
          })}
          <div ref={ref}></div>
        </ClipPlayCommentOverflow>
      </ClipplayCommentBox>
    </>
  );
}

export default ClipPlayComment;

const CommentBoxLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ClipplayCommentBox = styled.div`
  height: 37.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  color: black;
  padding: 0 1.875rem;
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "100%")});
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${slideUp} 0.3s ease-in-out forwards;
    `};
`;

const ClipPlayCommentOverflow = styled.div`
  height: 25.625rem;
  overflow-y: auto;
`;

const ClipplayCommentTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bolder;
  margin-top: 3.125rem;
`;

const ClipplayCommentCount = styled.span`
  color: #ff9900;
  margin-left: 0.625rem;
`;

const ClipplayInputTitle = styled.div`
  margin: 1.25rem 0rem;
`;

const ClipplayInputForm = styled.form`
  display: flex;
  justify-content: center;
`;
