import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";

type HomeProps = {
  user?: Record<string, any>;
};

const Home = (props: HomeProps) => {
  return (
    <Default user={props.user}>
      <div className="relative mt-20 flex select-none flex-col items-center justify-center space-y-10">
        <div className="flex select-none flex-col items-center justify-center space-y-2">
          <div className="z-0 flex rotate-[-2deg] items-center bg-teal-400 py-2 px-8">
            <p className="font-monument rotate-[2deg] text-[7rem] font-bold text-dark-600">
              DISCOVER
            </p>
          </div>
          <div className="z-10 flex rotate-[2deg] items-center bg-rose-400 py-2 px-8">
            <p className="font-monument text-dark-60 rotate-[-2deg] text-[7rem] font-bold">
              WHAT&apos;S
            </p>
          </div>
          <div className="z-20 flex rotate-[-0.5deg] items-center bg-amber-200 py-2 px-8">
            <p className="font-monument text-dark-60 rotate-[-2deg] text-[7rem] font-bold">
              POSSIBLE
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="mt-2 h-2 w-8 rounded-full bg-blue-400" />
          <p className="max-w-xl text-xl text-white text-opacity-90">
            Connect to our network of undergrad students supporting local health research projects!
          </p>
        </div>
        <div className="absolute -top-14 left-0">
          <img
            draggable="false"
            src="/images/people/1.png"
            className="w-24 rounded-full border-4 border-white"
            alt="Person"
          />
          <div className="absolute top-[6.25rem] -right-4 flex bg-purple-500 px-4 py-0.5">
            <p className="text-lg text-white">Emerald</p>
          </div>
        </div>
        <div className="absolute top-28 right-0">
          <img
            draggable="false"
            src="/images/people/3.png"
            className="w-24 rounded-full border-4 border-white"
            alt="Person"
          />
          <div className="absolute top-[6.25rem] left-6 flex bg-red-500 px-4 py-0.5">
            <p className="text-lg text-white">Taylor</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <img
            draggable="false"
            src="/images/people/2.png"
            className="w-24 rounded-full border-4 border-white"
            alt="Person"
          />
          <div className="absolute top-[6.5rem] left-0 flex bg-orange-400 px-4 py-0.5">
            <p className="text-lg text-white">Dean</p>
          </div>
        </div>
      </div>
    </Default>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [response, error] = await Authenticate(ctx);

  if (error) {
    return {
      props: {},
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
