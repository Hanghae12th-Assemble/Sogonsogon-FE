import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __searchUser } from "../redux/module/searchUser";
import { setLocalStorage, removeLocalStorage } from "../util/localStorage";

function SearchHistory({
  searchHistory,
  setIsSearch,
  setSearchInfo,
  setSearchHistory,
}) {
  const dispatch = useDispatch();

  const deleteSearchHistory = (idx) => {
    setSearchHistory(searchHistory.filter((item, index) => idx !== index));
    setLocalStorage(
      "searchHistory",
      JSON.stringify(searchHistory.filter((item, index) => idx !== index))
    );
  };

  const clearSearchHistory = () => {
    removeLocalStorage("searchHistory");
    setSearchHistory([]);
  };

  const recentSearchValueHandler = (data) => {
    dispatch(__searchUser(data));
    setIsSearch(true);
    setSearchInfo(data);
  };

  return (
    <>
      <SearchHistoryHeader>
        최근 검색어
        <div onClick={clearSearchHistory}>전체삭제</div>
      </SearchHistoryHeader>
      <SearchHistoryContainer>
        <SearchHistoryBody>
          <div>
            {searchHistory.map((data, idx) => {
              return (
                <SearchHistoryLayout key={idx}>
                  <RecentSearchValue
                    onClick={() => recentSearchValueHandler(data)}
                  >
                    {data}
                  </RecentSearchValue>

                  <AiOutlineCloseCircle
                    cursor={"pointer"}
                    color={"#ff9900"}
                    size={24}
                    onClick={() => deleteSearchHistory(idx, data)}
                  />
                </SearchHistoryLayout>
              );
            })}
          </div>
        </SearchHistoryBody>
      </SearchHistoryContainer>{" "}
    </>
  );
}

export default SearchHistory;

const SearchHistoryContainer = styled.div`
  background-color: #f9f9fa;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3125rem 1.5625rem 0rem 1.5625rem;
`;

const SearchHistoryHeader = styled.div`
  background-color: #f9f9fa;
  width: 100%;
  min-height: 3.125rem;
  display: flex;
  align-items: center;
  padding: 0.625rem 0rem 0rem 2.0625rem;
  margin-top: 0.625rem;
  font-size: 1.25rem;
  color: #000;
  font-weight: bold;
  flex-direction: row;
  justify-content: space-between;
  div {
    cursor: pointer;
    margin-right: 3.125rem;
    font-size: 0.75rem;
    color: #a7a492;
    text-decoration: underline;
  }
`;

const SearchHistoryLayout = styled.div`
  padding: 0rem 1.25rem 0rem 0.625rem;
  width: 100%;
  min-height: 2.5rem;
  background-color: #f9f9fa;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0.625rem;
  align-items: center;
  justify-content: space-between;
`;

const RecentSearchValue = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1.0625rem;
  cursor: pointer;
`;

const SearchHistoryBody = styled.div`
  width: 100%;
  height: 100%;
`;
