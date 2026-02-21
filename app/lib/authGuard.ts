export function checkAccess(
  router: any,
  currentEnv: string
) {
  const user = localStorage.getItem("sls_user");
  const allowedEnv = localStorage.getItem("sls_env");

  if (!user) {
    router.push("/login");
    return false;
  }

  if (allowedEnv !== currentEnv) {
    router.push(`/${allowedEnv}`);
    return false;
  }

  return true;
}