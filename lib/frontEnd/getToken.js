const get_token = (cookies) => {
  if (!cookies) {
    throw new Error("No cookies was passed");
  }
  const cookieStore = cookies();
  const token =
    process.env.NODE_ENV === "production"
      ? cookieStore.get("__Secure-next-auth.session-token")?.value
      : cookieStore.get("next-auth.session-token")?.value;
  return { Authorization: `Bearer ${token}` };
};
export { get_token };
