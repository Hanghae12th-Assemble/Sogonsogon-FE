import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import styled from "styled-components";
import Button from "../elements/Button";
import { __createCip } from "../redux/module/createClip";
import { __updateClip } from "../redux/module/updateClip";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function CreateClipInputs({
  setFormformImagin,
  setPreview,
  preview,
  formImagin,
  setSelectedFile,
  selectedFile,
  formcheck,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState("");

  useEffect(() => {
    setFormState(formcheck);
  }, []);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.introduction);
    formData.append("audioclip", selectedFile);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    if (formState === "create") {
      dispatch(__createCip({ clipInfo: formData, audioablumId: id }));
    } else {
      dispatch(__updateClip({ clipInfo: formData, audioablumId: id }));
    }

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <CrRadioButtonSpanBox>
          <span>앨범 이름*</span>
          <CrRadioPublicScopButton>
            <Input
              register={register}
              type={"text"}
              name={"title"}
              placeholder={"클립 제목을 입력해주세요."}
              validation={{
                required: "클립 제목을 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>앨범 소개</span>
          <CrRadioPublicScopButton>
            <Input
              register={register}
              type={"text"}
              name={"introduction"}
              placeholder={"클립 정보를 입력해주세요."}
              validation={{
                required: "클립 정보를 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>오디오 업로드</span>
          <CrRadioPublicScopButton>
            <CrFileInput
              type="file"
              accept=".mp3, .mp4"
              onChange={handleFileChange}
            />
          </CrRadioPublicScopButton>
          <span>대표 이미지</span>
          <CrRadioPublicScopButton>
            <CrFileInput type="file" accept="image/*" onChange={onChangeimge} />
          </CrRadioPublicScopButton>
          <CrPreviewDiv>
            {preview ? (
              <div>
                <CrRadioImg src={preview} alt="Preview" />
              </div>
            ) : (
              <CrPreviewDivSpan>
                <span>이미지를 업로드 해주세요.</span>
              </CrPreviewDivSpan>
            )}
          </CrPreviewDiv>
        </CrRadioButtonSpanBox>
        <CrRadioButtonNext>
          <Button lgBtn>
            {" "}
            {formState === "create" ? "만들기" : "수정하기"}
          </Button>
        </CrRadioButtonNext>
      </form>
    </>
  );
}

export default CreateClipInputs;

const CrRadioButtonSpanBox = styled.div`
  margin-top: 40px;
`;

const CrRadioPublicScopButton = styled.div`
  margin-top: 10px;
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
  margin-right: 10px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`;
