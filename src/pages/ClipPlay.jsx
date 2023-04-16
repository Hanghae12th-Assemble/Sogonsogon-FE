import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { AiOutlineClose, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaPlay, FaStop } from "react-icons/fa";
import { BsFastForward, BsRewind } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { useState } from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import formatTime from "../util/formatTime";
import ClipPlayComment from "../components/ClipPlayComment";
import { __getClipDetail } from "../redux/module/getClipDetail";
import { useDispatch, useSelector } from "react-redux";
import { clickOut } from "../redux/module/reduxState/clickShutDown";
import { useParams } from "react-router-dom";
import { __likeClip } from "../redux/module/likeClip";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Forward } from "../asset/icon/15secondA.svg";
import { ReactComponent as Back } from "../asset/icon/15secondB.svg";

function ClipPlay() {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const { id } = useParams();
  const selectBtn = useSelector((state) => state.clickingModal);
  const clipdata = useSelector(
    (state) => state?.gettingClipDetail?.clip?.result
  );
  const likeData = useSelector((state) => state.likingClip?.clip);
  const ClipDetail = useSelector(
    (state) => state?.gettingClipDetail?.clip?.totalCommentCount
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getClipDetail(id));
  }, [likeData, selectBtn]);

  const playerRef = useRef(null);

  useEffect(() => {
    if (played === 1) {
      setPlaying(false);
    }
  }, [played]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const setCommentBox = () => {
    dispatch(clickOut(true));
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 15);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 15);
  };

  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed * duration);
  };

  const albumClip = () => {
    dispatch(__likeClip(id));
  };

  return (
    <>
      <BackgroundImage src={clipdata?.audioclipImageUrl} alt="Background" />
      <TransparentLayer />
      <ClipplayContent>
        <Navbar toNavigate={-1} iconleft={<AiOutlineClose size={25} />} />
        <div>
          <ClipplayTitle>
            <h1>{clipdata?.title}</h1>
          </ClipplayTitle>
          {selectBtn ? <ClipPlayComment selectBtn={selectBtn} /> : null}
          <ClipplayAuthorLike>
            <ClipplayAuthorProfile>
              <div>
                <ClipplayAuthorPhoto src={clipdata?.memberprofileImageUrl} />
              </div>
              <span
                onClick={() => {
                  document.startViewTransition(() =>
                    navigate(`/profile/${clipdata?.membername}`)
                  );
                }}
              >
                {clipdata?.membernickname}
              </span>
            </ClipplayAuthorProfile>
            <ClipplayLikeCount>
              {clipdata?.likeCheck === true ? (
                <AiFillHeart
                  size={30}
                  color={"ff9900"}
                  cursor={"pointer"}
                  onClick={albumClip}
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  cursor={"pointer"}
                  onClick={albumClip}
                />
              )}
              <span>{clipdata?.isLikeCount}</span>
            </ClipplayLikeCount>
          </ClipplayAuthorLike>
        </div>
        <ClipplayPlayBackImgDiv>
          <ReactPlayer
            ref={playerRef}
            url={clipdata?.audioclipUrl}
            playing={playing}
            onProgress={handleProgress}
            onDuration={handleDuration}
            width="0%"
            height="0"
            controls={false}
          />
          <ClipplayPlayBackImg src={clipdata?.audioclipImageUrl} />
        </ClipplayPlayBackImgDiv>
        <ClipplayRangeInputTime>
          <div>
            <ClipplayInput
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onChange={handleSeekChange}
            />
          </div>
          <ClipplayPlaytime>
            <div>{formatTime(played * duration)}</div>
            <div> {formatTime(duration)}</div>
          </ClipplayPlaytime>
        </ClipplayRangeInputTime>
        <ClipplayPlayIcon>
          <div onClick={handleRewind}>
            <ClipplayRwind size={50} />
          </div>
          <ClipplayButton onClick={handlePlayPause}>
            {playing ? <FaStop size={50} /> : <FaPlay size={50} />}
          </ClipplayButton>
          <div onClick={handleFastForward}>
            <ClipplayForward size={50} />
          </div>
        </ClipplayPlayIcon>
        <ClipplayComment onClick={setCommentBox}>
          <div>
            <BiComment size={20} />
          </div>
          <span>댓글</span>
          <ClipplayCommentCount>{ClipDetail}</ClipplayCommentCount>
        </ClipplayComment>
      </ClipplayContent>
    </>
  );
}

export default ClipPlay;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
`;

const TransparentLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1.875rem);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ClipplayContent = styled.div`
  padding: 0 1.25rem;
  z-index: 2;
  color: ${({ theme }) => theme.color.white_col};
  width: 100%;
  position: absolute;
`;

const ClipplayTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const ClipplayAuthorLike = styled.div`
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClipplayAuthorProfile = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.0625rem;
    cursor: pointer;
  }
`;

const ClipplayAuthorPhoto = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.625rem;
`;

const ClipplayLikeCount = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 0.625rem;
  }
`;

const ClipplayPlayBackImgDiv = styled.div`
  margin-top: 5rem;
  height: 15rem;
  display: flex;
  justify-content: center;
`;

const ClipplayPlayBackImg = styled.img`
  height: 15rem;
  width: 15rem;
  border-radius: 1.25rem;
`;

const ClipplayRangeInputTime = styled.div`
  margin-top: 5rem;
`;

const ClipplayInput = styled.input`
  width: 28.125rem;
  margin-bottom: 0.625rem;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: ${({ theme }) => theme.color.orange_col};
    cursor: pointer;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin-top: -0.4375rem;
  }

  &::-webkit-slider-runnable-track {
    background-color: ${({ theme }) => theme.color.orange_col};
    height: 0.125rem;
  }
`;

const ClipplayPlaytime = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ClipplayPlayIcon = styled.div`
  margin-top: 4.375rem;
  display: flex;
  justify-content: space-evenly;
`;

const ClipplayButton = styled.div`
  cursor: pointer;
`;

const ClipplayRwind = styled(Back)`
  cursor: pointer;
  width: 3.4375rem;
`;

const ClipplayForward = styled(Forward)`
  cursor: pointer;
  width: 3.4375rem;
`;

const ClipplayComment = styled.div`
  cursor: pointer;
  margin-top: 8.4375rem;
  display: flex;
  justify-content: center;
  padding-bottom: 2.1875rem;
  span {
    margin-left: 0.625rem;
  }
`;

const ClipplayCommentCount = styled.span`
  color: ${({ theme }) => theme.color.orange_col};
`;
