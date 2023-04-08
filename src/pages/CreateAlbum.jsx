import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { __createClip } from "../redux/module/createClip";
import CreateAudioButton from "../components/CreateAudioButton";
import CreateAudioInputs from "../components/CreateAudioInputs";

function CreateAudio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");

  return (
    <CrRadioContainer>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={"/"}
          iconleft={<AiOutlineArrowLeft size={20} />}
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
  //border: 1px solid red;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
`;

const CrRadioContainerBox = styled.div`
  //border: 1px solid black;
  position: relative;
  z-index: 999;
`;
