import { withSessionSsr } from "../lib/withSession";
import { getUsers } from "../lib/db";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface PageProps {
  user: User | null;
}

export const genSSP: (
  getProps?: (
    context: GetServerSidePropsContext,
    user: User | null
  ) => Promise<Partial<PageProps> | { [key: string]: unknown } | string>
) => GetServerSideProps = (getProps) => {
  return withSessionSsr(async (context) => {
    const userId = context.req.session.id;
    let user = null;
    if (userId) {
      const findedUser = await getUsers().where("id", userId).first() as User;
      if (findedUser) {
        user = findedUser;
      }
    }

    const props = await getProps?.(context, user);

    if (typeof props === "string") {
      return {
        redirect: {
          destination: props,
        },
        props: {},
      };
    }

    return {
      props: {
        user,
        ...props,
      },
    };
  });
};
