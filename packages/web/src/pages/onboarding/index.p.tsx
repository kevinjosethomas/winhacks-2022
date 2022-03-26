import { GetServerSidePropsContext } from "next";

import Login from "./components/Login";
import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import SignUp from "./components/SignUp";

export default function Onboarding() {
  return (
    <Default>
      <div className="flex flex-col items-center space-y-20">
        <p className="font-monument text-6xl text-white">Get Started</p>
        <div className="flex h-5/6 items-center justify-center space-x-10">
          <SignUp />
          <div className="h-full w-1 rounded-full bg-white bg-opacity-10" />
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
