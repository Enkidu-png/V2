import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
};

export const generateAuthCookie = async ({
  prefix,
  value,
}: Props) => {
  const cookies = await getCookies();

  // Authentication on subdomain routing does not work in development
  // "sameSite" and "secure" must both be present for it to work
  // but it is not supported in development, only in production
  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
    ...(process.env.NODE_ENV !== "development" && {
      sameSite: "none",
      domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      secure: true,
    }),
  })
};
