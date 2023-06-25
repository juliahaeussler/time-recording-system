export const getFromLocalStorage = (localStorageKey) => {
  let localStorageString = null;
  try {
    localStorageString = window.localStorage.getItem(localStorageKey);
  } catch (e) {
    // This can actually happen, e.g. on mobile Safari if user has blocked cookies
  }
  return localStorageString;
};

export const getUserFromLocalStorage = () => {
  const localStorageString = getFromLocalStorage("user");
  if (localStorageString) {
    const user = JSON.parse(localStorageString);
    return user;
  } else {
    return null;
  }
};