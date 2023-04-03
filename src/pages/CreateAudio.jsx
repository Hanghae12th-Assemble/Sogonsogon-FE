import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { __createAudio } from "../redux/module/createAudio";
import CreateRadioButton from "../components/CreateRadioButton";

function Createradio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [mediaFile, setMediaFile] = useState(null);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const selectBtn = useSelector((state) => state.radioButn[0]);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("audioclipImage", img);
    const reader = new FileReader();
    setFormformImagin(formImg);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (img) {
      reader.readAsDataURL(img);
    } else {
      setPreview("");
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.introduction);
    formData.append("audioclip", mediaFile);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    dispatch(__createAudio(formData));
    reset();
  };

  return (
    <CrRadioContainer>
      <>
        <div></div>
      </>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={"/"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"방송하기"}
        />
        <CreateRadioButton />
        <form onSubmit={handleSubmit(submitForm)}>
          <CrRadioButtonSpanBox>
            <span>방송 제목*</span>
            <CrRadioPublicScopButton>
              <Input
                register={register}
                type={"text"}
                name={"title"}
                placeholder={"방송제목을 입력해주세요."}
                validation={{
                  required: "방송 제목을 입력해주세요.",
                }}
                errors={errors}
              />
            </CrRadioPublicScopButton>
          </CrRadioButtonSpanBox>
          <CrRadioButtonSpanBox>
            <span>방송 공지*</span>
            <CrRadioPublicScopButton>
              <Input
                register={register}
                type={"text"}
                name={"introduction"}
                placeholder={"방송 공지를 입력해주세요."}
                validation={{
                  required: "방송 공지를 입력해주세요.",
                }}
                errors={errors}
              />
            </CrRadioPublicScopButton>
          </CrRadioButtonSpanBox>
          <CrRadioButtonSpanBox>
            <span>이미지</span>
            <CrRadioPublicScopButton>
              <CrFileInput
                type="file"
                accept="image/*"
                onChange={onChangeimge}
              />
            </CrRadioPublicScopButton>
            <input type="file" onChange={onFileChange} accept=".mp4,.mp3" />
            {/* <CrPreviewDiv>
              {preview ? (
                <div>
                  <CrRadioImg src={preview} alt="Preview" />
                </div>
              ) : (
                <CrPreviewDivSpan>
                  <span>이미지를 업로드 해주세요.</span>
                </CrPreviewDivSpan>
              )}
            </CrPreviewDiv> */}
          </CrRadioButtonSpanBox>
          <CrRadioButtonNext>
            <Button lgBtn>만들기</Button>
          </CrRadioButtonNext>
        </form>
      </CrRadioContainerBox>
    </CrRadioContainer>
  );
}

export default Createradio;

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

const CrRadioButtonSpanBox = styled.div`
  //border: 1px solid black;
  margin-top: 40px;
`;

const CrRadioPublicScopButton = styled.div`
  margin-top: 10px;
  //border: 1px solid black;
`;

const CrFileInput = styled.input`
  margin-bottom: 30px;
  ::file-selector-button {
    width: 370px;
    height: 48px;
    background: #f1f2f6;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #262626;
      color: white;
    }
  }
`;

const CrPreviewDiv = styled.div`
  //border: 1px solid black;
  height: 400px;
`;

const CrPreviewDivSpan = styled.div`
  border: 1px solid black;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: bolder;
  }
`;

const CrRadioImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;

const CrRadioButtonNext = styled.div`
  //border: 1px solid black;
  margin-right: 10px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`;
