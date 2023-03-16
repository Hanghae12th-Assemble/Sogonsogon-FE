import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { __createRadio } from "../redux/module/createRadio";

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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("introduction", data.introduction);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    dispatch(__createRadio(formData));
    reset();
  };

  return (
    // <div>
    //   <div>
    //     {preview && (
    //       <div>
    //         <img
    //           style={{
    //             width: "80%",
    //             height: "60%",
    //           }}
    //           src={preview}
    //           alt="Preview"
    //         />
    //       </div>
    //     )}
    //   </div>
    //   <form onSubmit={handleSubmit(submitForm)}>
    //     <input
    //       {...register("title", {
    //         required: "타이틀을 입력해주세요.",
    //       })}
    //       type="text"
    //       placeholder="타이틀을 입력해주세요."
    //     />
    //     <span>{errors?.title?.message}</span>
    //     <input
    //       {...register("introduction", {
    //         required: "자기소개를 입력해주세요.",
    //       })}
    //       type="text"
    //       placeholder="자기소개를 입력해주세요."
    //     />
    //     <span>{errors?.introduction?.message}</span>
    //     <input type="file" accept="image/*" onChange={onChangeimge} />
    //     <span>{errors?.file?.message}</span>
    //     <button>제출</button>
    //   </form>
    // </div>

    <CrRadioContainer>
      <CrRadioBox>
        <Navbar
          toNavigate={"/"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"방송하기"}
        />
      </CrRadioBox>
    </CrRadioContainer>
  );
}

export default Createradio;

const CrRadioContainer = styled.div`
  border: 1px solid black;
  height: 100%;
`;

const CrRadioBox = styled.div`
  border: 1px solid black;
`;
