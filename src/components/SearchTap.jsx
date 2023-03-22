import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../elements/Button';
import { __searchRadio } from '../redux/module/searchRadio';
import { __searchUser } from '../redux/module/searchUser';

function SearchTap({ searchInfo, sort, setIsSearch, setSort }) {
    const dispatch = useDispatch();

    const search = (type) => {
        setIsSearch(true);
        if (type === 'user') {
            dispatch(__searchUser(searchInfo));
            dispatch(__searchRadio(searchInfo));
            setSort(true);
        } else if (type === 'live') {
            dispatch(__searchRadio(searchInfo));
            dispatch(__searchUser(searchInfo));
            setSort(false);
        }
    };

    return (
        <SortBtnContainer>
            <Button
                SortBtn
                className={sort === true ? 'active' : ''}
                onClick={() => search('user')}
            >
                프로필
            </Button>
            <Button
                SortBtn
                className={sort === false ? 'active' : ''}
                onClick={() => search('live')}
            >
                라이브
            </Button>
        </SortBtnContainer>
    );
}

export default SearchTap;

const SortBtnContainer = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 32px;
    margin-top: 10px;
`;
