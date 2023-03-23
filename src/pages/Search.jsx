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
    searchingRadio: { live },
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
          size={20}
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
                <>
                  <StRadioContainer>
                    <RadioContainer radio={live?.data} />
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
  padding: 0px 30px;
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
    13px center / contain no-repeat rgb(249, 249, 250);
  border: none;
  outline: none;
`;
