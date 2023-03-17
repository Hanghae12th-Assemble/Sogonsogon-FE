import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Input from "../elements/Input";
import { __searchRadio } from "../redux/module/searchRadio";
import { __searchUser } from "../redux/module/searchUser";

function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [searchInfo, setSearchInfo] = useState();

  const onSearch = (data) => {
    setSearchInfo(data.title);
    dispatch(__searchRadio(data.title));
    reset();
  };

  const searchUser = () => {
    dispatch(__searchUser(searchInfo));
  };

  const searchLive = () => {
    dispatch(__searchRadio(searchInfo));
  };

  return (
    <>
      <Navbar
        toNavigate={"/"}
        iconleft={<AiOutlineArrowLeft size={20} />}
        title={"검색페이지"}
      />
      <form onSubmit={handleSubmit(onSearch)}>
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
      </form>
      <button onClick={searchUser}>프로필</button>
      <button onClick={searchLive}>라이브</button>
      <div>Search</div>
    </>
  );
}

export default Search;
