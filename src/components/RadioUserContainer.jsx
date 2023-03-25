import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function RadioUserContainer(props) {
    const navigate = useNavigate();

    return (
        <>
            <SearchUserContainer>
                {props.user?.map((item) => {
                    return (
                        <SearchUserLayout
                            onClick={() => {
                                document.startViewTransition(() =>
                                    navigate(`/profile/${item.membername}`)
                                );
                            }}
                            key={item.id}
                        >
                            <RadioPreviewProfileImg backgroundImageUrl={item.profileImageUrl} />
                            <SearchUserContentContainer>
                                <SearchUserNicknameLayout>{item.nickname}</SearchUserNicknameLayout>
                                <SearchUserContentLayout>
                                    {' '}
                                    <SearchUserMembernameLayout>
                                        {item.membername}
                                    </SearchUserMembernameLayout>
                                    <SearchUserMembernameLayout>
                                        <CenterLine />
                                        팔로워 {item.followers}명
                                    </SearchUserMembernameLayout>
                                </SearchUserContentLayout>

                                <SearchUserDescLayout>{item.introduction}</SearchUserDescLayout>
                            </SearchUserContentContainer>
                        </SearchUserLayout>
                    );
                })}
            </SearchUserContainer>
        </>
    );
}

export default RadioUserContainer;

const SearchUserContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 20px;
    padding: 20px 25px 0px 25px;
    z-index: -1;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`;

const SearchUserLayout = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
`;

const RadioPreviewProfileImg = styled.div`
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 100%;
    margin: 0px 20px 0px 20px;
    opacity: 0.9;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: flex-end;
    display: flex;
    flex-direction: row-reverse;
    transition: all 0.5s ease-in-out 0s;
    :hover {
        transform: scale(1);
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out 0s;
    }
`;
const SearchUserContentContainer = styled.div`
    min-height: 80px;
    display: flex;
    flex-direction: column;
`;

const SearchUserNicknameLayout = styled.div`
    min-height: 25px;
    font-size: 18px;
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
    min-height: 25px;
    font-size: 15px;
    display: flex;
    align-items: center;
    color: #1a1919b3;
`;
const CenterLine = styled.div`
    width: 1px;
    margin: 0px 5px 0px 5px;
    height: 12px;
    border: 1px solid #1a1919b3;
`;

const SearchUserDescLayout = styled.div`
    min-height: 25px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #1a1919b3;
`;
