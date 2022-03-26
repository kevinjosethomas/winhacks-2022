import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";

const Home: NextPage = () => {
  return (
    <Default>
      <div className="relative flex flex-col items-center justify-center space-y-10 mt-20 select-none">
        <div className="flex flex-col items-center justify-center space-y-2 select-none">
          <div className="z-10 flex items-center bg-teal-400 py-2 px-8 rotate-[-2deg]">
            <p className="text-[7rem] font-monument text-dark-600 font-bold rotate-[2deg]">
              DISCOVER
            </p>
          </div>
          <div className="z-20 flex items-center bg-rose-400 py-2 px-8 rotate-[2deg]">
            <p className="text-[7rem] font-monument text-dark-60 font-bold rotate-[-2deg]">
              WHAT&apos;S
            </p>
          </div>
          <div className="z-30 flex items-center bg-amber-200 py-2 px-8 rotate-[-0.5deg]">
            <p className="text-[7rem] font-monument text-dark-60 font-bold rotate-[-2deg]">
              POSSIBLE
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="w-8 h-2 mt-2 bg-blue-400 rounded-full" />
          <p className="text-white text-xl text-opacity-90 max-w-xl">
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
          <div className="top-[6.25rem] absolute left-0 flex px-4 py-0.5 bg-purple-500">
            <p className="text-white text-lg">Elina</p>
          </div>
        </div>
        <div className="absolute top-28 right-0">
          <img
            draggable="false"
            src="/images/people/3.png"
            className="w-24 rounded-full border-4 border-white"
            alt="Person"
          />
          <div className="top-[6.25rem] absolute left-6 flex px-4 py-0.5 bg-red-500">
            <p className="text-white text-lg">Taylor</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <img
            draggable="false"
            src="/images/people/2.png"
            className="w-24 rounded-full border-4 border-white"
            alt="Person"
          />
          <div className="top-[6.5rem] absolute left-0 flex px-4 py-0.5 bg-orange-400">
            <p className="text-white text-lg">Dean</p>
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
