import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Check } from "../asset/icon/check_box.svg";
import { ReactComponent as UnCheck } from "../asset/icon/no check.svg";

function SelectBtnContainer({ state, setState, editClicked, selectedContent, contentId }) {

    const toggleContentSelection = (contentId) => {
        const index = selectedContent.indexOf(contentId);
        if (index !== -1) {
            const updatedSelections = [...selectedContent];
            updatedSelections.splice(index, 1);
            setState({ ...state, selectedContent: [...updatedSelections] });
        } else {
            setState({ ...state, selectedContent: [...selectedContent, contentId] });
        }
    };


    const isSelected = selectedContent.includes(contentId);
    return (
        <>
            {editClicked && (
                <SelectBtnLayout>
                    {isSelected ? (
                        <StCheckSvg
                            onClick={() => toggleContentSelection(contentId)}

                        />
                    ) : (
                        <StUnCheckSvg
                            onClick={() => toggleContentSelection(contentId)}
                        />
                    )}
                </SelectBtnLayout>
            )}
        </>
    )
}

export default SelectBtnContainer


const SelectBtnLayout = styled.div`
     /* border: 1px solid red; */
     width: fit-content;
    display: flex;
    align-items: center;
`;

const StCheckSvg = styled(Check)`
    width: 30px;
    margin-left: 5px;
    cursor: pointer;
`

const StUnCheckSvg = styled(UnCheck)`
    width: 30px;
    margin-left: 5px;
    cursor: pointer;
`
