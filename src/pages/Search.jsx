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
    const { user } = useSelector((state) => {
        return state.searchingUser;
    });

    const { live } = useSelector((state) => {
        return state.searchingRadio;
    });

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
                                    <SearchUserLayout key={item.key}>
                                        {item.profileImageUrl}
                                        {item.nickname}
                                        {item.membername}
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
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    grid-gap: 10px;
    flex-direction: row;
    padding: 0px 25px 0px 25px;
    z-index: -1;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
    border: 1px solid black;
`;

const SearchUserLayout = styled.div`
    width: 100%;
    height: 60px;
    border: 1px solid black;
`;
