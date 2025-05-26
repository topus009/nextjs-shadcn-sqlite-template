import React from "react";
import { genSSP, PageProps } from "../../lib/genSSP";
import { useUserContext } from "../hooks/use-user-context";

const Users: React.FC<PageProps> = (props) => {
  useUserContext(props.user);

  return (
    <div className="flex min-h-page flex-col px-10 py-12">
      <div className="w-full max-w-4xl container mx-auto">
      </div>
    </div>
  )
};

export const getServerSideProps = genSSP();

export default Users;
