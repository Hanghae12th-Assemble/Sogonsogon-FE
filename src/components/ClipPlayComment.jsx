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
import { __updateAudioComment } from "../redux/module/updateAudioComment";
import { clickModi } from "../redux/module/reduxState/clickModiComment";

function ClipPlayComment() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [isVisible] = useState(true);
  const [commentId, setCommentId] = useState("");
  const page = useRef(1);
  const [ref, inView] = useInView();
  const { id } = useParams();
  const commentlist = useSelector((state) => state?.gettingAudioComment);
  const commentPost = useSelector((state) => state?.creatingAudioComment);
  const modiComment = useSelector((state) => state?.clickingModiComment);
  const removeComment = useSelector((state) => state?.removingAudioComment);

  const clickModalOut = () => {
    dispatch(clickOut(false));
    dispatch(clickModi({ modi: false, id }));
  };

  useEffect(() => {
    setCommentId(modiComment.id);
  }, [modiComment]);

  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getAudioComment({ audioId: id, page: page.current }));
  }, [commentPost, modiComment, removeComment]);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getAudioComment({ audioId: id, page: page.current }));
    }
  }, [inView]);

  const submitForm = async (data) => {
    if (modiComment.modi === false || modiComment.modi === undefined) {
      dispatch(
        __createAudioComment({
          audioId: id,
          commentInfo: { content: data.content },
        })
      );
    } else {
      await dispatch(
        __updateAudioComment({
          commentId: commentId,
          commentInfo: { content: data.content },
        })
      );
      dispatch(clickModi({ modi: false, id }));
    }

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
            <span>전체 댓글 </span>
            <span>{commentlist?.comment[0]?.metadata?.audioClipCount}</span>
          </ClipplayInputTitle>
          <div>
            <ClipplayInputForm onSubmit={handleSubmit(submitForm)}>
              <ClipplayCommentInput
                commentInput
                register={register}
                type={"text"}
                name={"content"}
                placeholder={
                  modiComment?.modi
                    ? "수정할 댓글을 입력해주세요."
                    : "댓글을 입력해주세요."
                }
                validation={{
                  required: "댓글을 입력해주세요.",
                }}
              />
              <ClipplayInputBtn smCommentBtn>
                {modiComment?.modi ? "수정" : "등록"}
              </ClipplayInputBtn>
            </ClipplayInputForm>
          </div>
        </div>
        <ClipPlayCommentOverflow>
          {commentlist?.comment?.map((item, index) => {
            return item?.result?.map((item, index) => {
              return <ClipCommentList props={item} id={item.id} key={index} />;
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
  border-top-left-radius: 1.875rem;
  border-top-right-radius: 1.875rem;
  height: 37.5rem;
  position: fixed;
  bottom: 0;
  left: 29.375rem;
  z-index: 1;
  width: 42%;
  background-color: ${({ theme }) => theme.color.white_col};
  color: ${({ theme }) => theme.color.softBlack_col};
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
  font-weight: bold;
  margin-top: 3.125rem;
`;

const ClipplayCommentInput = styled(Input)`
  padding: 0 1.125rem;
`;

const ClipplayInputTitle = styled.div`
  margin: 1.25rem 0rem;
`;

const ClipplayInputForm = styled.form`
  display: flex;
  justify-content: center;
`;

const ClipplayInputBtn = styled(Button)`
  color: white;
`;
