export const getUpdatedHistory = (newKeyword, searchHistory) => {
  let updatedHistory = [...searchHistory];
  updatedHistory.unshift(newKeyword);
  updatedHistory = [...new Set(updatedHistory)].slice(0, 10);
  return updatedHistory;
};
