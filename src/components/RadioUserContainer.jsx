import React, { useRef } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import useScroll from '../hooks/useScroll';
import { RadioPreviewProfileImg } from '../pages/RadioPreview';

function RadioUserContainer(props) {
    const navigate = useNavigate();
    const SearchUserContainerRef = useRef();
    const scrollPos = useScroll(SearchUserContainerRef);

    return (
        <>
            <SearchUserContainer ref={SearchUserContainerRef}>
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
                            <RadioPreviewProfileImg>{item.profileImageUrl}</RadioPreviewProfileImg>
                            <SearchUserContentContainer>
                                <SearchUserNicknameLayout>{item.nickname}</SearchUserNicknameLayout>

                                <SearchUserMembernameLayout>
                                    {item.membername}
                                </SearchUserMembernameLayout>

                                <SearchUserMembernameLayout>
                                    <CenterLine />
                                    팔로워 25명
                                </SearchUserMembernameLayout>
                                <SearchUserDescLayout>
                                    오늘부터 매일 들어옵니다
                                </SearchUserDescLayout>
                            </SearchUserContentContainer>
                        </SearchUserLayout>
                    );
                })}
            </SearchUserContainer>
            {scrollPos > 500 && (
                <Button
                    TopBtn
                    onClick={SearchUserContainerRef.current.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })}
                >
                    <AiOutlineArrowUp size={15} />
                </Button>
            )}
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
    align-items: center;
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const SearchUserContentContainer = styled.div`
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const SearchUserNicknameLayout = styled.div`
    width: 100%;
    min-height: 25px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
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
    width: 100%;
    min-height: 25px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #1a1919b3;
`;
