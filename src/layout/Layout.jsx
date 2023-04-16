import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../asset/logo/logo.svg';
import { ReactComponent as Symbol } from '../asset/logo/symbol.svg';
import { getCookie } from "../util/cookie";
import { useState } from 'react';
import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useDispatch } from 'react-redux';
import { onMessage } from '../redux/module/reduxState/sseOnMessage';


const Layout = ({ children }) => {
    const token = getCookie("access-token");
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            fetchSse();
            return () => {
                eventSource && eventSource.close();
            };
        }
    }, []);
    let eventSource;
    const fetchSse = async () => {
        try {
            //EventSource생성.
            eventSource = new EventSourcePolyfill(
                `${process.env.REACT_APP_BASE_URL}api/notificaiton/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    heartbeatTimeout: 3600000,
                    withCredentials: true,
                }
            );

            eventSource.onmessage = async function (event) {
                const checkJSON = event.data.split(" ")[0];
                const data = checkJSON !== "EventStream" && JSON.parse(event.data);
                const message = data.message;
                dispatch(onMessage(true))
                const notificationTitle = '새로운 알림이 있습니다!';
                const notificationOptions = {
                    body: message,
                };
                if (notificationOptions.body !== undefined) {
                    const notification = new Notification(notificationTitle, notificationOptions);
                    notification.onclick = function (event) {
                        event.preventDefault();
                    };
                }
            };
        } catch (error) {
            if (eventSource) eventSource.close();
        }
    };
    return (
        <>
            <LayoutBox>
                <IconContainer>
                    <StSymbol />
                    <StLogo />
                    <StCommentContainer>
                        <div>어디서든 만나는 달콤한 이야기</div>
                        <p>소모임 오디오기반 소셜 플랫폼</p>
                    </StCommentContainer>
                </IconContainer>
                <Box>
                    <DivLayout2>{children}</DivLayout2>
                </Box>
            </LayoutBox>
        </>
    );
};

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 170px;
    left: 200px;
    transform: translate(-50%, 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const StLogo = styled(Logo)`
    position: fixed;
    top: 120px;
    left: 20px;
    width: 330px;
`;
const StSymbol = styled(Symbol)`
    width: 230px;
`;

const StCommentContainer = styled.div`
    position: fixed;
    top: 320px;
    left: 70px;
    width: 300px;
    font-size: 16px;
    font-weight: 600;
    div {
        color: #7b7b7b;
        margin-bottom: 5px;
    }
    p {
        color: #ededed;
    }
`;

const LayoutBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #2c2b2b;
    margin: 0 auto;
`;

const Box = styled.div`
    display: flex;
    margin-left: 20%;
    justify-content: center;
    box-shadow: 0 0.3125rem 1.125rem -0.4375rem rgba(0, 0, 0, 0.4);
    z-index: 1;
    @media screen and (max-width: 1000px) {
        margin: 0 auto;
    }
    @media screen and (max-width: 625px) {
        margin: 0 auto;
        width: 100%;
    }
`;

const DivLayout2 = styled.div`
    @media screen and (max-width: 420px) {
        width: 100%;
        margin: auto;
    }
    //border: 1px solid black;
    width: 31.25rem;
    height: 100vh;
    position: absolute;
    margin-left: 0 auto;
    display: flex;
    flex-direction: column;
    z-index: 1;
    background-color: white;
    box-shadow: 0 0.3125rem 1.125rem -0.4375rem rgba(0, 0, 0, 0.4);
`;

export default Layout;
