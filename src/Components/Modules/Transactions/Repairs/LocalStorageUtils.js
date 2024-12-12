export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  export const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  