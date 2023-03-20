import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { __searchRadio } from "../redux/module/searchRadio";
import { __searchUser } from "../redux/module/searchUser";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import RadioContainer from "../components/RadioContainer";
import Button from "../elements/Button";
import SearchHistory from "../components/SearchHistory";
import { RadioPreviewProfileImg } from "./RadioPreview";
import useScroll from "../hooks/useScroll";

function Search() {
  useEffect(() => {
    const histories = localStorage.getItem("searchHistory");
    if (histories) {
      setSearchHistory(JSON.parse(histories));
    }
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false); // 검색 발생 여부 스테이트
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
  // 새로운 검색어를 로컬스토리지에 추가하는 함수
  const addSearchHistory = (newKeyword) => {
    let updatedHistory = [...searchHistory];
    updatedHistory.unshift(newKeyword);
    updatedHistory = [...new Set(updatedHistory)].slice(0, 10); // 중복 검색어 방지 및 최근 10개까지 저장
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  //클릭한 검색기록 객체 정보와 인덱스 전달하는 함수 정의
  const deleteSearchHistory = (idx, value) => {
    setSearchHistory(searchHistory.filter((item, index) => idx !== index));
    // 로컬 스토리지에서도 삭제
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory.filter((item, index) => idx !== index))
    );
  };

  // 저장된 검색어 모두 삭제
  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const recentSearchValueHandler = (data) => {
    setIsSearch(true);
    setSearchInfo(data);
    dispatch(__searchUser(data));
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

  const BackBtnSearchValueHandler = () => {
    setIsSearch(false);
    dispatch(__searchUser(null));
    dispatch(__searchRadio(null));
    setSort(true);
    document.startViewTransition(() => navigate("/"));
  };

  const SearchUserContainerRef = useRef();
  const scrollPos = useScroll(SearchUserContainerRef);
  const topBtnHandler = () => {
    SearchUserContainerRef?.current.scrollTo({ top: 0, behavior: "smooth" });
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
                <>
                  <SearchUserContainer ref={SearchUserContainerRef}>
                    {user?.data.map((item) => {
                      return (
                        <SearchUserLayout
                          to={`/profile/${item.membername}`}
                          key={item.id}
                        >
                          <RadioPreviewProfileImg>
                            {item.profileImageUrl}
                          </RadioPreviewProfileImg>
                          <SearchUserContentContainer>
                            <SearchUserNicknameLayout>
                              {item.nickname}
                            </SearchUserNicknameLayout>

                            <SearchUserMembernameLayout>
                              {item.membername}
                            </SearchUserMembernameLayout>

                            <SearchUserMembernameLayout>
                              <CenterLine />
                              팔로워 25명
                            </SearchUserMembernameLayout>
                            <SearchUserDescLayout>
                              오늘부터 매일 들어옵니다
                            </SearchUserDescLayout>
                          </SearchUserContentContainer>
                        </SearchUserLayout>
                      );
                    })}
                  </SearchUserContainer>
                </>
              )}
              {SearchUserContainerRef && scrollPos > 10 && (
                <Button TopBtn onClick={topBtnHandler}>
                  <AiOutlineArrowUp size={15} />
                </Button>
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

const SearchUserContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  padding: 20px 25px 0px 25px;
  z-index: -1;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.1em;
    height: 0.1em;
  }
`;

const SearchUserLayout = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const SearchUserContentContainer = styled.div`
  width: 100%;
  min-height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SearchUserNicknameLayout = styled.div`
  width: 100%;
  min-height: 25px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const SearchUserMembernameLayout = styled.div`
  width: fit-content;
  min-height: 25px;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #1a1919b3;
`;
const CenterLine = styled.div`
  width: 1px;
  margin: 0px 5px 0px 5px;
  height: 12px;
  border: 1px solid #1a1919b3;
`;

const SearchUserDescLayout = styled.div`
  width: 100%;
  min-height: 25px;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #1a1919b3;
`;
