export const handleSelectedButtonClick = (
  key,
  valueKey,
  button,
  setSelected,
  setButtonVlaue
) => {
  setButtonVlaue((preveVlaue) => ({
    ...preveVlaue,
    [valueKey]: button.value,
  }));
  setSelected((prevSelected) => ({
    ...prevSelected,
    [key]: button.buttonNum,
  }));
};
