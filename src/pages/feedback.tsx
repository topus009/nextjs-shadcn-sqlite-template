import React from "react";
import { genSSP, PageProps } from "../../lib/genSSP";
import { FeedbackForm } from "components/components/feedback-form"
import { useUserContext } from "../hooks/use-user-context";

const Feedback: React.FC<PageProps> = (props) => {
  useUserContext(props?.user);

  return (
    <div className="flex min-h-page flex-col items-center justify-center px-10 py-12">
      <div className="w-full max-w-sm md:max-w-1xl">
        <FeedbackForm />
      </div>
    </div>
  )
};

export const getServerSideProps = genSSP();

export default Feedback;
