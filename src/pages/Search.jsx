import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { __searchUser } from "../redux/module/searchUser";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RadioContainer from "../components/RadioContainer";
import SearchHistory from "../components/SearchHistory";
import RadioUserContainer from "../components/RadioUserContainer";
import { addSearchHistory } from "../util/getUpdatedHistory";
import SearchTap from "../components/SearchTap";
import { StRadioContainer } from "../pages/Home";
import { getLocalStorage } from "../util/localStorage";
import { ReactComponent as NotResult } from "../asset/icon/notresult.svg";

function Search() {
  const [isSearch, setIsSearch] = useState(false);
  const [state, setState] = useState({
    sort: true,
    searchInfo: "",
    searchHistory: [],
  });

  const { sort, searchHistory, searchInfo } = state;

  const navigate = useNavigate();
  const {
    searchingUser: { user },
    searchingAudio: { live },
  } = useSelector((state) => state);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const histories = getLocalStorage("searchHistory");
    if (histories) {
      setState({
        ...state,
        searchHistory: JSON.parse(histories),
      });
    }
  }, [searchInfo]);

  const onSearch = (data) => {
    setIsSearch(true);
    setState({ ...state, sort: true, searchInfo: data.searchValue });
    dispatch(__searchUser(data.searchValue));
    addSearchHistory({
      newKeyword: data.searchValue,
      searchHistory: [...searchHistory],
    });
  };

  return (
    <>
      <SearchbarBox>
        <AiOutlineArrowLeft
          cursor={"pointer"}
          size={25}
          onClick={() => {
            document.startViewTransition(() => navigate("/"));
          }}
        />
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
          <SearchTap
            searchInfo={searchInfo}
            sort={sort}
            setIsSearch={setIsSearch}
            setSort={(value) => setState({ ...state, sort: value })}
          />
          {sort ? (
            <>
              {user?.data?.length === 0 ? (
                <>
                  <NotResultContainer>
                    <StNotResultSvg />
                    <h3>검색 결과가 없습니다.</h3>
                  </NotResultContainer>
                </>
              ) : (
                <>
                  <SearchUserContainer>
                    {user?.data?.map((props, index) => {
                      return <RadioUserContainer props={props} key={index} />;
                    })}
                  </SearchUserContainer>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              {live?.data?.length === 0 ? (
                <>
                  <NotResultContainer>
                    <StNotResultSvg />
                    <h3>검색 결과가 없습니다.</h3>
                  </NotResultContainer>
                </>
              ) : (
                <>
                  <StRadioContainer>
                    {live?.data?.map((props, index) => {
                      return <RadioContainer props={props} key={index} />;
                    })}
                  </StRadioContainer>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <SearchHistory
          setIsSearch={setIsSearch}
          setSearchInfo={(value) => setState({ ...state, searchInfo: value })}
          setSearchHistory={(value) =>
            setState({ ...state, searchHistory: value })
          }
          searchHistory={searchHistory}
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
  padding: 0rem 1.875rem;
  min-height: 3.125rem;
  margin-top: 2.5rem;
`;

const SearchInput = styled.input`
  width: 23.75rem;
  height: 2.5rem;
  padding-left: 3.4375rem;
  border-radius: 0.9375rem;
  margin-left: 1.25rem;
  font-size: 1rem;
  background: url("https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png")
    0.75rem center / contain no-repeat #f5f4f2;
  border: none;
  outline: none;
`;

const SearchUserContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 1.25rem;
  padding: 1.25rem 1.5625rem 0rem 1.5625rem;
  z-index: -1;
  overflow: auto;
`;

const NotResultContainer = styled.div`
  margin: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StNotResultSvg = styled(NotResult)`
  width: 15.625rem;
`;
