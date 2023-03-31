import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import RadioInfobar from "../components/RadioInfobar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://3.37.146.173:8080/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

function ListenRadio() {
  const { id } = useParams();
  const [contents, setContents] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { gettingRadio } = useSelector((state) => state);
  const userdata = useSelector((state) => state?.enteringRadio?.radio);

  useEffect(() => {
    setUsername(userdata?.data?.nickname);
  }, []);

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/chat/${id}`, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [contents]);

  const handleEnter = (content) => {
    const newMessage = { username, content };
    stompClient.send(`/pub/${id}`, {}, JSON.stringify(newMessage));
    setMessage("");
  };

  const addMessage = (message) => {
    setContents((prev) => [...prev, message]);
  };

  const getRadioData = gettingRadio?.radio?.map((item) =>
    item.data.result.map((i) => i)
  );

  const radioData = getRadioData?.map((item, i) =>
    item.find((i) => i.id === Number(id))
  );
  const foundRadio = radioData.filter((item) => {
    if (item !== undefined) {
      return item;
    }
  });
  return (
    <LSRadio>
      <LSRadioTopBox backgroundImageUrl={foundRadio[0]?.backgroundImageUrl}>
        <RadioInfobar />
        <LSRadioProfileContainer>
          <LsProfileLayout>
            {" "}
            <LSRadioTopTitlePhoto />
            <span>{foundRadio[0]?.nickname}</span>
            <p>· DJ</p>
          </LsProfileLayout>
          <LSRadioTopTitle>
            <span>{foundRadio[0]?.title}</span>
          </LSRadioTopTitle>
        </LSRadioProfileContainer>
        <LsBlackBackground />
      </LSRadioTopBox>
      <LSRadioChattingBox>
        <LsBottomContainer>
          <LsInputContainer>
            <input placeholder="대화를 나눠보세요" />
            <button>전송</button>
          </LsInputContainer>
        </LsBottomContainer>
      </LSRadioChattingBox>
    </LSRadio>
  );
}

export default ListenRadio;

const LSRadio = styled.div`
  /* border: 1px solid blue; */
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const LsBlackBackground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

const LSRadioTopBox = styled.div`
  position: relative;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* border: 1px solid black; */
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #dddcdc;
`;

const LSRadioTopTitle = styled.div`
  /* border: 1px solid black; */
  display: flex;
  padding: 5px 25px 15px 30px;
  font-size: 18px;
  font-weight: bold;
`;

const LSRadioTopTitlePhoto = styled.div`
  border: 3px solid #ff601c;
  box-shadow: inset 0 0 0 2px #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background-color: #c8bebe;
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 3px 2px #000000;
    transition: all 0.2s ease-in-out 0s;
  }
`;

const LSRadioProfileContainer = styled.div`
  border-bottom: 1px solid #d9d7d7;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 25px 25px 0px 0px;
  margin-top: 211px;
  z-index: 1;
`;

const LsProfileLayout = styled.div`
  padding: 25px 25px 10px 25px;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  span {
    font-size: 20px;
    margin-left: 15px;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: #ff9900;
  }
`;

const LSRadioChattingBox = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 65%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LsBottomContainer = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  padding: 5px 25px 20px 25px;
`;

const LsInputContainer = styled.label`
  position: relative;
  input {
    width: 300px;
    height: 45px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: none;
    border-radius: 25px;
    outline: none;
    font-size: 15px;
    padding-left: 20px;
  }
  button {
    position: absolute;
    top: -8px;
    bottom: 0;
    right: 4px;
    border-radius: 100%;
    font-size: 10px;
    width: 39px;
    height: 39px;
    border: none;
    background-color: #ebbf6a;
    color: white;
    cursor: pointer;
  }
`;
