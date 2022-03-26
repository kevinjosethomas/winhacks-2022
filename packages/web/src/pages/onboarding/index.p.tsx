import { GetServerSidePropsContext } from "next";

import Login from "./components/Login";
import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import SignUp from "./components/SignUp";

function Onboarding() {
  return (
    <Default>
      <div className="flex flex-col items-center space-y-20">
        <p className="text-6xl font-monument text-white">Get Started</p>
        <div className="flex items-center justify-center h-5/6 space-x-10">
          <SignUp />
          <div className="h-full w-1 bg-white rounded-full bg-opacity-10" />
          <Login />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [response, error] = await Authenticate(ctx);

  if (error) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: `/u/${response.payload.user_id}`,
        permanent: false,
      },
    };
  }
}

export default Onboarding;
