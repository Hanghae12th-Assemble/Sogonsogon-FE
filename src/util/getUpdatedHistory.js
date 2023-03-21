export const addSearchHistory = ({ newKeyword, searchHistory }) => {
  let updatedHistory = [...searchHistory];
  updatedHistory.unshift(newKeyword);
  updatedHistory = [...new Set(updatedHistory)].slice(0, 10);
  localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
};
