import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";

type AdminProps = {
  user: Record<string, any>;
};

export default function Admin(props: AdminProps) {
  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-8">
        <p className="font-monument text-5xl text-white">Project Approval</p>
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
    if (response.payload.type !== 3) {
      return {
        redirect: {
          destination: "/projects",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: response.payload,
      },
    };
  }
}
