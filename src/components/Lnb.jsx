import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import { getCookie, removeCookie } from "../util/cookie";
import { getLocalStorage, removeLocalStorage } from "../util/localStorage";
import { EventSourcePolyfill } from "event-source-polyfill";
import { __getAlarm } from "../redux/module/getAlarm";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Home } from "../asset/icon/home.svg";
import { ReactComponent as Music } from "../asset/icon/music.svg";
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";
import { ReactComponent as Notifications } from "../asset/icon/notifications.svg";
import { ReactComponent as NotificationsOn } from "../asset/icon/notifications_on.svg";
import { ReactComponent as Person } from "../asset/icon/person.svg";

function Lnb({ isOpen, handleItemClick }) {
  const token = getCookie("access-token");
  const username = JSON.parse(getLocalStorage("userInfo"));
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(false);
  const data = useSelector((state) => state.gettingAlarm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // fetchSse();
      if (isOpen === true) {
        dispatch(__getAlarm());
      }
      // return () => {
      //     eventSource && eventSource.close();
      // };
    }
  }, [isOpen, alarm]);

  useEffect(() => {
    const unreadAlarms = data?.alarm?.some((item) => !item.readStatus);
    setAlarm(unreadAlarms);
  }, [data]);

  // let eventSource;
  // const fetchSse = async () => {
  //     try {
  //         //EventSource생성.
  //         eventSource = new EventSourcePolyfill(
  //             `${process.env.REACT_APP_BASE_URL}api/notificaiton/`,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                 },
  //             }
  //         );

  //         eventSource.onmessage = async function (event) {
  //             if (event.data !== `EventStream Created. [userId=${username.id}]`) {
  //                 const data = JSON.parse(event.data);
  //                 const message = data.message;
  //                 const notificationTitle = '새로운 알림이 있습니다!';
  //                 const notificationOptions = {
  //                     body: message,
  //                 };
  //                 setAlarm(true);
  //                 const notification = new Notification(notificationTitle, notificationOptions);
  //                 notification.onclick = function (event) {
  //                     event.preventDefault();
  //                     document.startViewTransition(() => navigate(`/alarm/${username.userName}`));
  //                 };
  //             }
  //         };
  //     } catch (error) {
  //         if (eventSource) eventSource.close();
  //     }
  // };

  const [items, setItems] = useState([
    { id: 1, icon: <Home />, name: "홈", link: "/" },
    { id: 2, icon: <Music />, name: "음악", link: "/tag/음악" },
    { id: 3, icon: <Daily />, name: "일상", link: "/tag/일상" },
    { id: 4, icon: <Book />, name: "도서", link: "/tag/도서" },
    { id: 5, icon: <Asmr />, name: "ASMR", link: "/tag/ASMR" },
  ]);

  const categoryMenuBtnHandler = (link) => {
    document.startViewTransition(() => navigate(`${link}`));
    handleItemClick();
  };

  const LogoutBtnHandler = () => {
    removeCookie("access-token");
    removeLocalStorage("userInfo");
    document.startViewTransition(() => navigate("/selectlogin"));
  };

  return (
    <>
      <LnbLayout isOpen={isOpen}>
        {token && username ? (
          <>
            {alarm ? (
              <>
                <LnbAlarmBtnContainer>
                  <LnbNotificationsOn
                    onClick={() => {
                      document.startViewTransition(() =>
                        navigate(`/alarm/${username.userName}`)
                      );
                    }}
                  />
                </LnbAlarmBtnContainer>
              </>
            ) : (
              <LnbAlarmBtnContainer>
                <LnbNotifications
                  onClick={() => {
                    document.startViewTransition(() =>
                      navigate(`/alarm/${username.userName}`)
                    );
                  }}
                />
              </LnbAlarmBtnContainer>
            )}

            <LoginTrueFalseContainer
              login={token && username}
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(`/profile/${username.userName}`)
                );
              }}
            >
              <p>{username.nickName}님</p>
              <AiOutlineRight size={20} />
            </LoginTrueFalseContainer>
            <LoginHiLayout>안녕하세요!</LoginHiLayout>
          </>
        ) : (
          <>
            <LoginTrueFalseContainer
              onClick={() => {
                document.startViewTransition(() => navigate("/selectlogin"));
              }}
            >
              <div>로그인/회원가입</div>
              <AiOutlineRight size={20} />
            </LoginTrueFalseContainer>
            <LoginHiLayout />
          </>
        )}
        <LnbMenuLayout>
          {items.map((item) => (
            <div key={item.id}>
              <div onClick={() => categoryMenuBtnHandler(item.link)}>
                <span>{item.icon}</span>
                {item.name}
              </div>
            </div>
          ))}
        </LnbMenuLayout>
        {token && username && (
          <>
            <MyAlbumBtn
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(`/album/${username.userName}`)
                );
                handleItemClick();
              }}
            >
              <div>
                <span>
                  <Person />
                </span>
                내 앨범
              </div>
            </MyAlbumBtn>
            <LogoutBtnLayout onClick={LogoutBtnHandler}>
              로그아웃
            </LogoutBtnLayout>
          </>
        )}
      </LnbLayout>
      <LnbBlackBackGround isOpen={isOpen} onClick={handleItemClick} />
    </>
  );
}

export default Lnb;

const slideIn = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 350px;
  }
`;


const LnbLayout = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: -2.5rem;
  left: 0;
  height: 100%;
  background-color: white;
  z-index: 999;
  margin-top: 2.5rem;
  animation: ${({ isOpen }) => isOpen && css`${slideIn} 0.25s ease-in-out forwards`};
`;



const LnbAlarmBtnContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 3.75rem 0rem 0rem 1.5625rem;
`;
const LnbNotificationsOn = styled(NotificationsOn)`
  width: 1.75rem;
  cursor: pointer;
`;

const LnbNotifications = styled(Notifications)`
  width: 1.75rem;
  cursor: pointer;
  color: #77756f;
`;

const LnbMenuLayout = styled.div`
  height: 16.25rem;
  padding: 1.5625rem;
  margin-top: 5rem;

  div {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.625rem;
    display: flex;
    align-items: flex-start;
    color: #333;
  }
  span {
    width: 1.25rem;
    margin-right: 0.625rem;
  }
`;

const LoginTrueFalseContainer = styled.div`
  margin-top: ${({ login }) => (login ? "3.125rem" : "8.75rem")};
  width: 100%;
  height: 1.875rem;
  padding: 0rem 0.625rem 0rem 1.5625rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  p {
    font-size: 1.5625rem;
    font-weight: 500;
    text-decoration: underline 0.3125rem #ffc37c;
  }
  div {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const LoginHiLayout = styled.div`
  width: 100%;
  height: 1.875rem;
  padding: 0rem 0rem 0rem 1.5625rem;
  display: flex;
  align-items: center;
  color: grey;
  font-size: 0.875rem;
`;

const LogoutBtnLayout = styled.div`
  margin: 7.5rem 0rem 0rem 1.5625rem;
  width: 3.375rem;
  height: 1.0625rem;
  font-size: 0.8125rem;
  color: grey;
  cursor: pointer;
`;

const LnbBlackBackGround = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 995;
  top: 0;
  bottom: 0;
`;

const MyAlbumBtn = styled.div`
  padding: 0rem 0rem 0rem 1.5625rem;
  margin-top: 1.25rem;
  div {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.625rem;
    display: flex;
    align-items: flex-start;
    color: #333;
  }
  span {
    width: 1.25rem;
    margin-right: 0.625rem;
  }
`;
