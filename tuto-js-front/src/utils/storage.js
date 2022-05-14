export const setUser = (type, _id, code, token) => {
  localStorage.setItem(
    "user",
    JSON.stringify({ _id: _id, code: code, type: type, token: token })
  );
};

export const getUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
