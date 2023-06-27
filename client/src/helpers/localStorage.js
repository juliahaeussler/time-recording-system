export const getFromLocalStorage = (localStorageKey) => {
  let localStorageString = null;
  try {
    localStorageString = window.localStorage.getItem(localStorageKey) || null;
    // console.log('local', localStorageString)
    return localStorageString;
  } catch (e) {
    // This can actually happen, e.g. on mobile Safari if user has blocked cookies
  }
};

export const getUserFromLocalStorage = () => {
  const localStorageString = getFromLocalStorage("user") || null;
  // console.log('string', localStorageString)
  if (localStorageString) {
    const user = JSON.parse(localStorageString);
    // console.log('hello')
    return user;
  } else {
    console.log('touch')
    console.log('touch')
    return null;
  }
};