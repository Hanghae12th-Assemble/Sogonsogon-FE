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
        <SortLiveBtnContainer>
          앨범
        </SortLiveBtnContainer>
      </Button>
    </SortBtnContainer>
  );
}

export default SearchTap;

const SortBtnContainer = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  margin-top: 10px;
`;

const SortLiveBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortLiveMark = styled.div`
  margin-left: 5px;
  width: 42px;
  height: 24px;
  font-size: 14px;
  border-radius: 20px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  color: ${({ sort }) => (sort ? "#999999" : "white")};
  background-color: ${({ sort }) => (sort ? "#f4f4f4" : "#ff601c")};
  justify-content: center;
`;
