import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import isLogin from "../util/checkCookie";

function RadioUserContainer({ props }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin() === false) {
      alert("로그인부터 해주세요.");
      navigate("/selectlogin");
    }
  }, []);

  return (
    <>
      <SearchUserLayout
        onClick={() => {
          document.startViewTransition(() =>
            navigate(`/profile/${props.membername}`)
          );
        }}
        key={props.id}
      >
        <RadioPreviewProfileImg backgroundImageUrl={props.profileImageUrl} />
        <SearchUserContentContainer>
          <SearchUserNicknameLayout>{props.nickname}</SearchUserNicknameLayout>
          <SearchUserContentLayout>
            {" "}
            <SearchUserMembernameLayout>
              {props.membername}
            </SearchUserMembernameLayout>
            <SearchUserMembernameLayout>
              <CenterLine />
              팔로워 {props.followers}명
            </SearchUserMembernameLayout>
          </SearchUserContentLayout>

          <SearchUserDescLayout>{props.introduction}</SearchUserDescLayout>
        </SearchUserContentContainer>
      </SearchUserLayout>
    </>
  );
}

export default RadioUserContainer;

const SearchUserLayout = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 6.25rem;
`;

const RadioPreviewProfileImg = styled.div`
  min-width: 4.375rem;
  min-height: 4.375rem;
  overflow: hidden;
  position: relative;
  background-color: #393b3a6e;
  border-radius: 100%;
  margin: 0rem 1.25rem 0rem 1.25rem;
  opacity: 0.9;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1);
    box-shadow: 0rem 0rem 0.3125rem 0.125rem rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;
const SearchUserContentContainer = styled.div`
  min-height: 5rem;
  display: flex;
  flex-direction: column;
`;

const SearchUserNicknameLayout = styled.div`
  min-height: 1.5625rem;
  font-size: 1.125rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const SearchUserContentLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchUserMembernameLayout = styled.div`
  width: fit-content;
  min-height: 1.5625rem;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  color: #1a1919b3;
`;

const CenterLine = styled.div`
  width: 0.0625rem;
  margin: 0rem 0.3125rem 0rem 0.3125rem;
  height: 0.75rem;
  border: 0.0625rem solid #1a1919b3;
`;

const SearchUserDescLayout = styled.div`
  min-height: 1.5625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: #1a1919b3;
`;
