import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function RadioUserContainer({ props }) {
    const navigate = useNavigate();

    return (
        <>
            <SearchUserLayout
                onClick={() => {
                    document.startViewTransition(() => navigate(`/profile/${props.membername}`));
                }}
                key={props.id}
            >
                <RadioPreviewProfileImg backgroundImageUrl={props.profileImageUrl} />
                <SearchUserContentContainer>
                    <SearchUserNicknameLayout>{props.nickname}</SearchUserNicknameLayout>
                    <SearchUserContentLayout>
                        {' '}
                        <SearchUserMembernameLayout>{props.membername}</SearchUserMembernameLayout>
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
