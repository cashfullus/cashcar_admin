import { CASHCARPLUS_TOKEN } from "lib/constants";
import { RootState } from "lib/modules";
import { loginAsync, logout as logoutAction } from "lib/modules/auth";
import { AdminLoginPayload } from "lib/modules/shared/types";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useLogin = () => {
  const dispatch = useDispatch();
  const authLoading = useSelector((state: RootState) => state.loading.login);
  const initialLoading = useSelector(
    (state: RootState) => state.loading.initialization
  );
  const loading = useMemo(
    () => authLoading || initialLoading,
    [authLoading, initialLoading]
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const logout = () => {
    localStorage.removeItem(CASHCARPLUS_TOKEN);
    dispatch(logoutAction());
  };
  const login = (payload: AdminLoginPayload) =>
    dispatch(loginAsync.request(payload));
  return {
    login,
    logout,
    loading,
    isLoggedIn,
  };
};

export default useLogin;
