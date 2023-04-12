import React from "react";
import styled from "styled-components";

function RadioCountContainer({ props }) {
  const albumCount = props?.album[0]?.data?.metadata?.audioAlbumCount;
  return (
    <>
      {" "}
      <RadioCountLayout>
        {" "}
        <div>
          총 <p>{albumCount}개</p>의
        </div>{" "}
        <div>앨범이 있어요</div>
      </RadioCountLayout>
    </>
  );
}

export default RadioCountContainer;

const RadioCountLayout = styled.div`
  width: 100%;
  padding: 0.625rem 1.875rem;
  font-size: 1.25rem;
  font-weight: bold;
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.3125rem;
  }
  p {
    margin-left: 0.4375rem;
    color: #f98c01;
  }
`;
