import React from "react";
import { genSSP, PageProps } from "../../lib/genSSP";
import { ChangePasswordForm } from "components/components/change-password-form"
import { useUserContext } from "../hooks/use-user-context";

const Login: React.FC<PageProps> = (props) => {
  useUserContext(props?.user);

  return (
    <div className="flex min-h-page flex-col items-center justify-center px-10 py-12">
      <div className="w-full max-w-sm md:max-w-1xl">
        <ChangePasswordForm />
      </div>
    </div>
  )
};

export const getServerSideProps = genSSP();

export default Login;
