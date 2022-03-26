import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";

type HomeProps = {
  user?: Record<string, any>;
};

const Home = (props: HomeProps) => {
  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col">
        <p className="font-monument text-5xl text-white">Open Projects</p>
      </div>
    </Default>
  );
};

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

export default Home;
