import authHeader from "./auth-header.js";

const useAuth = () => {
  const auth = authHeader();
  if (auth !== undefined) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
