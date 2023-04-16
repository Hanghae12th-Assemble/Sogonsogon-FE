import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import styled from "styled-components";
import Button from "../elements/Button";
import { __createCip } from "../redux/module/createClip";
import { __updateClip } from "../redux/module/updateClip";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const { gettingClips } = useSelector((state) => state);

  // console.log(gettingClips?.clip[1]?.data?.result[0]?.title);
  // console.log(gettingClips?.clip[1]?.data?.result[0]?.contents);

  // console.log(gettingClips?.clip[0]?.data?.result[0]?.title);
  // console.log(gettingClips?.clip[0]?.data?.result[0]?.contents);

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

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.introduction);
    formData.append("audioclip", selectedFile);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    const action =
      formState === "create"
        ? await dispatch(__createCip({ clipInfo: formData, audioablumId: id }))
        : await dispatch(
            __updateClip({ clipInfo: formData, audioablumId: id })
          );

    if (action.payload && action.payload >= 200 && action.payload < 300) {
      navigate(-1);
    } else {
      alert("본인 클립이 아니거나 중복된 클립입니다.");
    }

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <CrRadioButtonSpanBox>
          <span>클립 이름*</span>
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
          <span>클립 소개 *</span>
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
          <span>오디오 업로드 *</span>
          <CrRadioPublicScopButton>
            <CrFileInput
              type="file"
              accept=".mp3, .mp4"
              onChange={handleFileChange}
              required
            />
          </CrRadioPublicScopButton>
          <span>대표 이미지 *</span>
          <CrRadioPublicScopButton>
            <CrFileInput
              type="file"
              accept="image/*"
              required
              onChange={onChangeimge}
            />
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
  margin-top: 2.5rem;
`;

const CrRadioPublicScopButton = styled.div`
  margin-top: 0.625rem;
`;

const CrFileInput = styled.input`
  margin-bottom: 1.875rem;
  ::file-selector-button {
    width: 23.125rem;
    height: 3rem;
    background: ${({ theme }) => theme.color.darkWhite_col};
    border-radius: 0.625rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.color.softBlack_col};
      color: ${({ theme }) => theme.color.white_col};
    }
  }
`;

const CrPreviewDiv = styled.div`
  height: 25rem;
`;

const CrPreviewDivSpan = styled.div`
  border: 0.0625rem solid black;
  height: 25rem;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 1.25rem;
    font-weight: bolder;
  }
`;

const CrRadioImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 25rem;
  border-radius: 0.625rem;
`;

const CrRadioButtonNext = styled.div`
  margin-right: 0.625rem;
  height: 9.375rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 1.25rem;
`;
