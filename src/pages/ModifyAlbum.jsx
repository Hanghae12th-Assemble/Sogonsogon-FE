import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { __createClip } from "../redux/module/createClip";
import CreateAudioButton from "../components/CreateAudioButton";
import CreateAudioInputs from "../components/CreateAudioInputs";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function ModifyAudio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  const modifyAlbum = useSelector((state) => state?.updatingAlbum);

  if (modifyAlbum?.isLoading) {
    return <Loading />;
  }

  return (
    <CrRadioContainer>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={30} />}
          title={"앨범 수정하기"}
        />
        <CreateAudioButton />
        <CreateAudioInputs
          setFormformImagin={setFormformImagin}
          setPreview={setPreview}
          preview={preview}
          formImagin={formImagin}
          formcheck={"modify"}
        />
      </CrRadioContainerBox>
    </CrRadioContainer>
  );
}

export default ModifyAudio;

const CrRadioContainer = styled.div`
  height: 100%;
  padding: 0 1.25rem;
  overflow-y: auto;
`;

const CrRadioContainerBox = styled.div`
  position: relative;
  z-index: 999;
`;
