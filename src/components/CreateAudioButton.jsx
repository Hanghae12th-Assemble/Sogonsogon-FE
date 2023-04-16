import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleSelectedButtonClick } from "../util/handleButton";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { butn } from "../redux/module/reduxState/createRadioButton";
import { ReactComponent as Music } from "../asset/icon/music.svg";
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";

function CreateRadioButton() {
  const [selected, setSelected] = useState("");
  const [buttonVlaue, setButtonVlaue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(butn({ title: buttonVlaue.title }));
  }, [buttonVlaue]);

  const handleButtonClick = (button) => {
    handleSelectedButtonClick(
      "selectedButton",
      "title",
      button,
      setSelected,
      setButtonVlaue
    );
  };

  const icons = [
    <StyledIcon>
      <Music />
    </StyledIcon>,
    <StyledIcon>
      <Daily />
    </StyledIcon>,
    <StyledIcon>
      <Book />
    </StyledIcon>,
    <StyledIcon>
      <Asmr />
    </StyledIcon>,
  ];

  return (
    <>
      <CrRadioButtonSpanBox>
        <span>앨범 주제*</span>
        <CrRadioPublicScopButton>
          {["음악", "일상", "도서", "ASMR"].map((text, i) => {
            return (
              <CrRadioButton
                key={i}
                isSelected={selected.selectedButton === `button${i}`}
                onClick={() =>
                  handleButtonClick({ buttonNum: `button${i}`, value: text })
                }
                CrRadioBtn
              >
                <CrRadioBtn>
                  {icons[i]}
                  {text}
                </CrRadioBtn>
              </CrRadioButton>
            );
          })}
        </CrRadioPublicScopButton>
      </CrRadioButtonSpanBox>
    </>
  );
}

export default CreateRadioButton;

const CrRadioPublicScopButton = styled.div`
  margin-top: 0.625rem;
`;

const CrRadioButtonSpanBox = styled.div`
  margin-top: 2.5rem;
  span {
    font-weight: bold;
  }
`;

const CrRadioButton = styled(Button)`
  margin-right: 0.625rem;
  background-color: ${(props) => (props.isSelected ? "#262626" : "#F0EFED")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  padding: 0 0.1875rem;
`;

const CrRadioBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  svg {
    width: 1.25rem;
    margin-right: 0.625rem;
  }
`;
