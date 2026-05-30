import { AxiosInstance } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async (
  api: AxiosInstance,
  setUser: (u: any) => void,
  router: any
) => {
  try {
    await api.post("/accounts/auth/logout/");
  } catch (e) {
    console.error(e);
  } finally {
    setUser(null);
    router.replace("/signin");
  }
};