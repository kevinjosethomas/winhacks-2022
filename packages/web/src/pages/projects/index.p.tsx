import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import Header from "./index/components/Header";

type ProjectsProps = {
  user: Record<string, any>;
};

export default function Projects(props: ProjectsProps) {
  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col">
        <Header user={props.user} />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [response, error] = await Authenticate(ctx);

  if (error) {
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: response.payload,
      },
    };
  }
}
