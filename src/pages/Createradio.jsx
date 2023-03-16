import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { __createRadio } from "../redux/module/createRadio";
import CreateRadioButton from "../components/CreateRadioButton";

function Createradio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const selectBtn = useSelector((state) => state.radioButn[0]);

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

  const submitForm = (data) => {
    console.log(
      "방송 주제:",
      selectBtn.title,
      "공개 범위:",
      selectBtn.scope,
      data
    );
    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("introduction", data.introduction);
    // for (const keyValue of formImagin) {
    //   formData.append(keyValue[0], keyValue[1]);
    // }

    // dispatch(__createRadio(formData));
    reset();
  };

  return (
    <CrRadioContainer>
      <div>
        <div>
          {preview && (
            <div>
              <CrRadioBackgroundOVeraly />
              <CrRadioImg src={preview} alt="Preview" />
            </div>
          )}
        </div>
      </div>
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
            <span>해시태그*</span>
            <CrRadioPublicScopButton>
              <Input
                register={register}
                type={"text"}
                name={"hashtag"}
                placeholder={"해시태그를 입력해주세요."}
                validation={{
                  required: "해시태그를 입력해주세요.",
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
                name={"notice"}
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

const CrRadioImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const CrRadioBackgroundOVeraly = styled.div`
  background-color: rgba(0, 0, 0, 0.3); /* 원하는 연한 배경색을 설정하세요. */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const CrRadioButtonNext = styled.div`
  //border: 1px solid black;
  margin-right: 10px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
