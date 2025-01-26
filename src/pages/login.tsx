import React from "react";
import { genSSP, PageProps } from "../../lib/genSSP";
import { LoginForm } from "components/components/login-form"
import { useUserContext } from "../hooks/use-user-context";

const Login: React.FC<PageProps & { referer?: string }> = (props) => {
  useUserContext(props?.user);

  return (
    <div className="flex min-h-page flex-col items-center justify-center px-10 py-12">
      <div className="w-full max-w-sm md:max-w-1xl">
        <LoginForm referer={props.referer}/>
      </div>
    </div>
  )
};

export const getServerSideProps = genSSP(async (context) => {
  const referer = context.req.headers.referer || '';

  return {
    referer,
  };
});
export default Login;
