export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name);
};
