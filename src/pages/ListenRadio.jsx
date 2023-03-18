import React from "react";
import styled from "styled-components";

function ListenRadio() {
  return (
    <LSRadio>
      <LSRadioTopBox>
        <LSRadioTop>
          <LSRadioTopLive>
            <span>Live</span>
          </LSRadioTopLive>
          <LSRadioTopMember>
            <span>30</span>
          </LSRadioTopMember>
        </LSRadioTop>
        <LSRadioTopTitle>
          <LSRadioTopTitlePhoto>프로필 사진</LSRadioTopTitlePhoto>
          <LSRadioTopTitleName>
            <LSRadioTopTitleSpan>
              <span>고은</span>
            </LSRadioTopTitleSpan>
            <div>
              <span>포근한 음악</span>
            </div>
          </LSRadioTopTitleName>
        </LSRadioTopTitle>
      </LSRadioTopBox>
      <LSRadioChattingBox></LSRadioChattingBox>
    </LSRadio>
  );
}

export default ListenRadio;

const LSRadio = styled.div`
  border: 1px solid blue;
  height: 100%;
  padding: 0px 20px;
  overflow: auto;
`;

const LSRadioTopBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 400px;
`;

const LSRadioTop = styled.div`
  border: 1px solid red;
  margin-top: 30px;
  display: flex;
  width: 100%;
`;

const LSRadioTopLive = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LSRadioTopMember = styled(LSRadioTopLive)`
  margin-left: 10px;
`;

const LSRadioTopTitle = styled.div`
  border: 1px solid black;
  display: flex;
  margin-top: 50px;
`;

const LSRadioTopTitlePhoto = styled.div`
  border: 1px solid black;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LSRadioTopTitleName = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
`;

const LSRadioTopTitleSpan = styled.div`
  margin-bottom: 5px;
`;

const LSRadioChattingBox = styled.div`
  border: 1px solid black;
  height: 58%;
`;
