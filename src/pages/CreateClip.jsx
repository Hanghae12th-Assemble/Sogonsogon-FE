import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CreateClipInput from "../components/CreateClipInput";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function CreateClip() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const createClip = useSelector((state) => state?.creatingClip);

  if (createClip?.isLoading) {
    return <Loading />;
  }

  return (
    <CrRadioContainer>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={30} />}
          title={"클립 만들기"}
        />

        <CreateClipInput
          setFormformImagin={setFormformImagin}
          setPreview={setPreview}
          preview={preview}
          formImagin={formImagin}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          formcheck={"create"}
        />
      </CrRadioContainerBox>
    </CrRadioContainer>
  );
}

export default CreateClip;

const CrRadioContainer = styled.div`
  height: 100%;
  padding: 0 1.25rem;
  overflow-y: auto;
`;

const CrRadioContainerBox = styled.div`
  position: relative;
  z-index: 999;
`;
