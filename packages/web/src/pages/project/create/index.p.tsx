import { useState } from "react";
import { GetServerSidePropsContext } from "next";

import Left from "./components/Left";
import Right from "./components/Right";
import { Authenticate } from "api/user";
import Header from "./components/Header";
import Default from "ui/layouts/Default";
import { AFFILIATES, TASKS } from "api/data";

type ProjectsProps = {
  user: Record<string, any>;
};

export default function Projects(props: ProjectsProps) {
  const durationOptions = [
    {
      value: 0,
      label: "<1 month",
    },
    {
      value: 1,
      label: "1 month",
    },
    {
      value: 3,
      label: "3 months",
    },
    {
      value: 6,
      label: "6 months",
    },
  ];

  const affiliateOptions = [...AFFILIATES];

  const [params, setParams] = useState({
    name: "",
    description: "",
    tasks: [...TASKS],
    affiliation: affiliateOptions[0],
    duration: durationOptions[1],
    required_people: 1,
    accepting: true,
  });

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-4">
        <Header />
        <div className="grid w-full grid-cols-2 items-start gap-x-4">
          <Left params={params} setParams={setParams} durationOptions={durationOptions} />
          <Right params={params} setParams={setParams} affiliateOptions={affiliateOptions} />
        </div>
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
