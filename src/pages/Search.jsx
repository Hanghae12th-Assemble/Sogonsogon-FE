import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { __searchRadio } from '../redux/module/searchRadio';
import { __searchUser } from '../redux/module/searchUser';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RadioContainer from '../components/RadioContainer';
import Button from '../elements/Button';
function Search() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const dispatch = useDispatch();

    const [sort, setSort] = useState(true);
    const [searchInfo, setSearchInfo] = useState();

    const onSearch = (data) => {
        setSearchInfo(data.searchValue);
        dispatch(__searchUser(data.searchValue));
        setSort(true);
        reset();
    };

    const searchUser = () => {
        dispatch(__searchUser(searchInfo));
        setSort(true);
    };

    const searchLive = () => {
        dispatch(__searchRadio(searchInfo));
        setSort(false);
    };
    const {
        error: userError,
        isLoading: userIsLoading,
        user,
    } = useSelector((state) => {
        return state.searchingUser;
    });

    const {
        error: liveError,
        isLoading: liveIsLoading,
        live,
    } = useSelector((state) => {
        return state.searchingRadio;
    });

    if (userIsLoading || liveIsLoading) {
        return <div>로딩중입니다.</div>;
    }
    if (userError || liveError) return;

    return (
        <>
            <SearchbarBox>
                <Link to={'/'}>
                    <AiOutlineArrowLeft size={20} />
                </Link>
                <form onSubmit={handleSubmit(onSearch)}>
                    <SearchInput
                        {...register('searchValue', { required: '검색어를 입력해주세요.' })}
                        type="text"
                        placeholder="검색어를 입력해주세요."
                    />
                </form>
            </SearchbarBox>
            <SortBtnContainer>
                <Button SortBtn className={sort === true ? 'active' : ''} onClick={searchUser}>
                    프로필
                </Button>
                <Button SortBtn className={sort === false ? 'active' : ''} onClick={searchLive}>
                    라이브
                </Button>
            </SortBtnContainer>
            {sort ? (
                <>
                    {user?.data.length === 0 ? (
                        <div>검색 결과가 없습니다. </div>
                    ) : (
                        <SearchUserContainer>
                            {user?.data.map((item) => {
                                return (
                                    <SearchUserLayout
                                        to={`/profile/${item.membername}`}
                                        key={item.id}
                                    >
                                        <SearchUserImgContainer>
                                            {item.profileImageUrl}
                                        </SearchUserImgContainer>
                                        <SearchUserContentContainer>
                                            <SearchUserNicknameLayout>
                                                {item.nickname}
                                            </SearchUserNicknameLayout>

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
                    )}
                </>
            ) : (
                <>
                    {' '}
                    {live?.data.length === 0 ? (
                        <div>검색 결과가 없습니다.</div>
                    ) : (
                        <RadioContainer radio={live?.data} />
                    )}
                </>
            )}
        </>
    );
}

export default Search;

const SearchbarBox = styled.div`
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;
    min-height: 3.125rem;
    margin-top: 2.5rem;
`;

const SearchInput = styled.input`
    width: 400px;
    height: 35px;
    padding-left: 50px;
    border-radius: 15px;
    margin-left: 20px;
    font-size: 16px;
    background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png');
    background-repeat: no-repeat;
    background-position: 13px center;
    background-size: contain;
    border: none;
    outline: none;
    background-color: #9b9a9ace;
`;

const SortBtnContainer = styled.div`
    width: 100%;
    height: 40px;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    padding-left: 25px;
    margin-top: 10px;
`;

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
    /* border: 1px solid black; */
`;

const SearchUserLayout = styled(Link)`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
    /* border: 1px solid black; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const SearchUserImgContainer = styled.div`
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #aeabab52;
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
    /* border: 1px solid black; */
`;
const SearchUserMembernameLayout = styled.div`
    width: fit-content;

    min-height: 25px;
    font-size: 15px;
    /* border: 1px solid black; */
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
    /* border: 1px solid black; */
    color: #1a1919b3;
`;
