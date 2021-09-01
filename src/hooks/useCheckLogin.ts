import { CASHCARPLUS_TOKEN } from "lib/constants";
import { useEffect } from "react";
import { useHistory } from "react-router";
import routes from "routes/index";
import useLogin from "./useLogin";

const useCheckLogin = () => {
  const history = useHistory();
  const { isLoggedIn } = useLogin();
  const authToken = localStorage.getItem(CASHCARPLUS_TOKEN);
  useEffect(() => {
    if (!authToken && !isLoggedIn) {
      history.push(routes.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return;
};

export default useCheckLogin;
