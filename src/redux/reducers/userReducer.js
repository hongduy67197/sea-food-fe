const initUser = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : [];

function UserReducer(state = initUser, action) {
  switch (action.type) {
    case "user/login":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...action.payload };

    case "admin/login":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...action.payload };

    default:
      return { ...state };
  }
}
export default UserReducer;
