import React from "react";
import { genSSP, PageProps } from "../../lib/genSSP";
import { useUserContext } from "../hooks/use-user-context";

function Home(props: PageProps) {
  useUserContext(props.user);

  return (
    <div>
    </div>
  );
}


export const getServerSideProps = genSSP();
export default Home;
