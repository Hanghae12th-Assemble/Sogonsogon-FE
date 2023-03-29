import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleSelectedButtonClick } from "../util/handleButton";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { butn } from "../redux/module/reduxState/createRadioButton";
import { ReactComponent as Home } from "../asset/icon/home.svg";
import { ReactComponent as Music } from "../asset/icon/music.svg";
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";

function CreateRadioButton() {
  const [selected, setSelected] = useState({
    selectedButton: null,
    selectedScopButton: null,
  });
  const [buttonVlaue, setButtonVlaue] = useState({
    title: "",
    scop: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(butn({ title: buttonVlaue.title, scope: buttonVlaue.scop }));
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
  const handleScopeButtonClick = (button) => {
    handleSelectedButtonClick(
      "selectedScopButton",
      "scop",
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
        <span>방송 주제*</span>
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
      <CrRadioButtonSpanBox>
        <span>공개범위*</span>
        <CrRadioPublicScopButton>
          {["전체 공개", "구독자만"].map((text, i) => {
            return (
              <CrRadioScpeButton
                key={i}
                CrRadioBtn
                isSelecte={selected.selectedScopButton === `button${i}`}
                onClick={() =>
                  handleScopeButtonClick({
                    buttonNum: `button${i}`,
                    value: text,
                  })
                }
              >
                {text}
              </CrRadioScpeButton>
            );
          })}
        </CrRadioPublicScopButton>
      </CrRadioButtonSpanBox>
    </>
  );
}

export default CreateRadioButton;

const CrRadioPublicScopButton = styled.div`
  margin-top: 10px;
  //border: 1px solid black;
`;

const CrRadioButtonSpanBox = styled.div`
  //border: 1px solid black;
  margin-top: 40px;
`;

const CrRadioButton = styled(Button)`
  margin-right: 10px;
  background-color: ${(props) => (props.isSelected ? "#262626" : "#f1f2f6")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
`;

const CrRadioBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CrRadioScpeButton = styled(Button)`
  margin-right: 10px;
  background-color: ${(props) => (props.isSelecte ? "#262626" : "#f1f2f6")};
  color: ${(props) => (props.isSelecte ? "white" : "black")};
`;

const StyledIcon = styled.div`
  svg {
    width: 20px;
    margin-right: 10px;
  }
`;
