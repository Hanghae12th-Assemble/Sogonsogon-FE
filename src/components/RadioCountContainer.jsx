import React from 'react';
import styled from 'styled-components';

function RadioCountContainer({ props }) {
    const radioCount = props?.radio[0]?.data?.metadata?.radioCount;
    return (
        <>
            {' '}
            <RadioCountLayout>
                {' '}
                <div>
                    총 <p>{radioCount}개</p>의
                </div>{' '}
                <div>라이브가 있어요</div>
            </RadioCountLayout>
        </>
    );
}

export default RadioCountContainer;

const RadioCountLayout = styled.div`
    width: 100%;
    padding: 10px 30px;
    font-size: 20px;
    font-weight: bold;
    div {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
    }
    p {
        margin-left: 7px;
        color: #f98c01;
    }
`;
