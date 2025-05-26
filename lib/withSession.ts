import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

declare module "iron-session" {
  interface IronSessionData {
    id?: number;
  }
}

if (!process.env.SESSION_COOKIE_NAME) throw new Error("no SESSION_COOKIE_NAME");
if (!process.env.SESSION_COOKIE_SECRET) throw new Error("no SESSION_COOKIE_SECRET");

export const sessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME,
  password: process.env.SESSION_COOKIE_SECRET,
  cookieOptions: {
    maxAge: Number(process.env.SESSION_EXPIRATION_TIME),
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
