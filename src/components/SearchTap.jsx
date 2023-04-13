import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { __searchAudio } from "../redux/module/searchAudio";
import { __searchUser } from "../redux/module/searchUser";

function SearchTap({ searchInfo, sort, setIsSearch, setSort }) {
  const dispatch = useDispatch();

  const search = (type) => {
    setIsSearch(true);
    if (type === "user") {
      dispatch(__searchUser(searchInfo));
      setSort(true);
    } else if (type === "live") {
      dispatch(__searchAudio(searchInfo));
      setSort(false);
    }
  };

  return (
    <SortBtnContainer>
      <Button
        SortBtn
        className={sort === true ? "active" : ""}
        onClick={() => search("user")}
      >
        프로필
      </Button>
      <Button
        SortBtn
        className={sort === false ? "active" : ""}
        onClick={() => search("live")}
      >
        <SortLiveBtnContainer>앨범</SortLiveBtnContainer>
      </Button>
    </SortBtnContainer>
  );
}

export default SearchTap;

const SortBtnContainer = styled.div`
  width: 100%;
  min-height: 3.125rem;
  display: flex;
  align-items: center;
  padding-left: 1.5625rem;
  margin-top: 0.625rem;
`;

const SortLiveBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
