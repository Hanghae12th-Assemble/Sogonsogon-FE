export const getUpdatedHistory = (newKeyword, searchHistory) => {
    let updatedHistory = [...searchHistory];
    updatedHistory.unshift(newKeyword);
    updatedHistory = [...new Set(updatedHistory)].slice(0, 10);
    return updatedHistory;
};

export const setSearchHistory = (updatedHistory) => {
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
};

export const addSearchHistory = ({ newKeyword, searchHistory: [...searchHistory] }) => {
    console.log(newKeyword, searchHistory);
    const updatedHistory = getUpdatedHistory(newKeyword, searchHistory);
    setSearchHistory(updatedHistory);
};
