import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { __searchRadio } from "../redux/module/searchRadio";
import { __searchUser } from "../redux/module/searchUser";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RadioContainer from "../components/RadioContainer";
import Button from "../elements/Button";
import SearchHistory from "../components/SearchHistory";
import RadioUserContainer from "../components/RadioUserContainer";

function Search() {
  useEffect(() => {
    const histories = localStorage.getItem("searchHistory");
    if (histories) {
      setSearchHistory(JSON.parse(histories));
    }
  }, []);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState(true);
  const [searchInfo, setSearchInfo] = useState();
  const [searchHistory, setSearchHistory] = useState([]);

  const onSearch = (data) => {
    setSearchInfo(data.searchValue);
    setIsSearch(true);
    dispatch(__searchUser(data.searchValue));
    setSort(true);
    addSearchHistory(data.searchValue);
  };

  const addSearchHistory = (newKeyword) => {
    let updatedHistory = [...searchHistory];
    updatedHistory.unshift(newKeyword);
    updatedHistory = [...new Set(updatedHistory)].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const deleteSearchHistory = (idx, value) => {
    setSearchHistory(searchHistory.filter((item, index) => idx !== index));
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory.filter((item, index) => idx !== index))
    );
  };

  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const recentSearchValueHandler = (data) => {
    setIsSearch(true);
    setSearchInfo(data);
    dispatch(__searchUser(data));
  };

  const BackBtnSearchValueHandler = () => {
    setIsSearch(false);
    dispatch(__searchUser(null));
    dispatch(__searchRadio(null));
    setSort(true);
    document.startViewTransition(() => navigate("/"));
  };

  const searchUser = () => {
    setIsSearch(true);
    dispatch(__searchUser(searchInfo));
    setSort(true);
  };

  const searchLive = () => {
    setIsSearch(true);
    dispatch(__searchRadio(searchInfo));
    setSort(false);
  };

  const { searchingUser, searchingRadio } = useSelector((state) => state);

  const { user } = searchingUser;
  const { live } = searchingRadio;

  return (
    <>
      <SearchbarBox>
        <AiOutlineArrowLeft size={20} onClick={BackBtnSearchValueHandler} />
        <form onSubmit={handleSubmit(onSearch)}>
          <SearchInput
            {...register("searchValue", { required: "검색어를 입력해주세요." })}
            type="text"
            placeholder="검색어를 입력해주세요."
          />
        </form>
      </SearchbarBox>
      {isSearch ? (
        <>
          <SortBtnContainer>
            <Button
              SortBtn
              className={sort === true ? "active" : ""}
              onClick={searchUser}
            >
              프로필
            </Button>
            <Button
              SortBtn
              className={sort === false ? "active" : ""}
              onClick={searchLive}
            >
              라이브
            </Button>
          </SortBtnContainer>
          {sort ? (
            <>
              {user?.data.length === 0 ? (
                <div>검색 결과가 없습니다. </div>
              ) : (
                <RadioUserContainer user={user?.data} />
              )}
            </>
          ) : (
            <>
              {" "}
              {live?.data.length === 0 ? (
                <div>검색 결과가 없습니다.</div>
              ) : (
                <RadioContainer radio={live?.data} />
              )}
            </>
          )}{" "}
        </>
      ) : (
        <SearchHistory
          searchHistory={searchHistory}
          recentSearchValueHandler={recentSearchValueHandler}
          deleteSearchHistory={deleteSearchHistory}
          clearSearchHistory={clearSearchHistory}
        />
      )}
    </>
  );
}

export default Search;

const SearchbarBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 15px;
  min-height: 3.125rem;
  margin-top: 2.5rem;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 35px;
  padding-left: 50px;
  border-radius: 15px;
  margin-left: 20px;
  font-size: 16px;
  background: url("https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png")
    13px center / contain no-repeat #9b9a9ace;
  border: none;
  outline: none;
`;

const SortBtnContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 25px;
  margin-top: 10px;
`;
