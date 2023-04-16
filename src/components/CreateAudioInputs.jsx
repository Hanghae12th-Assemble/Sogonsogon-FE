import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import styled from "styled-components";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { __createAlbum } from "../redux/module/createAlbum";
import { __updateAlbum } from "../redux/module/updateAlbum";
import { useParams, useNavigate } from "react-router-dom";

function CreateRadioInputs({
  setFormformImagin,
  setPreview,
  preview,
  formImagin,
  formcheck,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const { id } = useParams();
  const btninfo = useSelector((state) => state.radioButn[0]);
  const [formState, setFormState] = useState("");
  const navigate = useNavigate();
  const { gettingAlbumDetail } = useSelector((state) => state);

  useEffect(() => {
    setFormState(formcheck);
  }, []);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("backgroundImageUrl", img);
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

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("categoryType", btninfo.title);
    formData.append("title ", data.title);
    formData.append("instruction", data.introduction);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    const action =
      formState === "create"
        ? await dispatch(__createAlbum(formData))
        : await dispatch(__updateAlbum({ albumInfo: formData, albumId: id }));

    if (action.payload && action.payload >= 200 && action.payload < 300) {
      navigate(-1);
    } else {
      console.log(action);
      alert("본인 앨범이 아니거나 중복된 앨범입니다.");
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
              value={
                formState === "modify"
                  ? gettingAlbumDetail?.album?.data?.result?.title
                  : null
              }
              placeholder={"앨범 제목을 입력해주세요."}
              validation={{
                required: "앨범 제목을 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>앨범 소개 *</span>
          <CrRadioPublicScopButton>
            <Input
              register={register}
              type={"text"}
              name={"introduction"}
              value={
                formState === "modify"
                  ? gettingAlbumDetail?.album?.data?.result?.instruction
                  : null
              }
              placeholder={"앨범 정보를 입력해주세요."}
              validation={{
                required: "앨범 정보를 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>이미지 *</span>
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
            {formState === "create" ? "만들기" : "수정하기"}
          </Button>
        </CrRadioButtonNext>
      </form>
    </>
  );
}

export default CreateRadioInputs;

const CrRadioButtonSpanBox = styled.div`
  margin-top: 2.5rem;
  font-weight: bold;
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
