import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { __createClip } from "../redux/module/createClip";
import CreateAudioButton from "../components/CreateAudioButton";
import CreateAudioInputs from "../components/CreateAudioInputs";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import isLogin from "../util/checkCookie";
import { useNavigate } from "react-router";

function CreateAudio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  const createAlbums = useSelector((state) => state?.creatingAlbum);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin() === false) {
      alert("로그인부터 해주세요.");
      navigate("/selectlogin");
    }
  }, []);

  if (createAlbums?.isLoading) {
    return <Loading />;
  }

  return (
    <CrRadioContainer>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={30} />}
          title={"앨범 만들기"}
        />
        <CreateAudioButton />
        <CreateAudioInputs
          setFormformImagin={setFormformImagin}
          setPreview={setPreview}
          preview={preview}
          formImagin={formImagin}
          formcheck={"create"}
        />
      </CrRadioContainerBox>
    </CrRadioContainer>
  );
}

export default CreateAudio;

const CrRadioContainer = styled.div`
  height: 100%;
  padding: 0 1.25rem;
  overflow-y: auto;
`;

const CrRadioContainerBox = styled.div`
  position: relative;
  z-index: 999;
`;
