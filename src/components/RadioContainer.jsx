import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function RadioContainer({ props }) {
  const navigate = useNavigate();
  return (
    <>
      <RadioLayout key={props?.id}>
        <RadioImgContainer
          onClick={() => {
            navigate(`/albumdetail/${props.id}`);
          }}
          style={{ backgroundImage: `url(${props?.backgroundImageUrl})` }}
        ></RadioImgContainer>
        <RadioContentLayout>
          <RadionContentMiniLayout>
            <RadioTitleLayout to={`/albumdetail/${props?.id}`}>
              {props?.title}
            </RadioTitleLayout>

            <RadioNameLayout
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(`/profile/${props?.memberName}`)
                );
              }}
            >
              {props?.meberNickname}
            </RadioNameLayout>
          </RadionContentMiniLayout>
        </RadioContentLayout>
      </RadioLayout>
    </>
  );
}

export default RadioContainer;

const RadioImgContainer = styled.div`
  min-height: 9.375rem;
  margin-bottom: 0.625rem;
  position: relative;
  background-color: ${({ theme }) => theme.color.darkWhite_col};
  border-radius: 0.9375rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
  transition: all 0.5s ease-in-out 0s;
  cursor: pointer;
  :hover {
    transform: scale(1.02);
    box-shadow: 0rem 0rem 0.625rem 0.125rem rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const RadioLayout = styled.div`
  width: 12.5rem;
  min-height: 13.75rem;
  margin: 0.625rem auto;
`;

const RadioContentLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RadioTitleLayout = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  padding-left: 0.3125rem;
  line-height: 1.5;
`;

const RadioNameLayout = styled.div`
  width: 9.0625rem;
  min-height: 1.25rem;
  padding: 0.3125rem 0rem 0rem 0rem;
  font-size: 0.75rem;
  padding-left: 0.3125rem;
  color: ${({ theme }) => theme.color.darkGray_col};
  cursor: pointer;
`;

const RadionContentMiniLayout = styled.div`
  width: 9.375rem;
  min-height: 3.125rem;
`;

const StIconSvg = styled.div`
  width: 1.5625rem;
  margin: 0.3125rem 0.625rem;
`;
