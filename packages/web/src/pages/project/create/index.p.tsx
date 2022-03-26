import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import Left from "./components/Left";
import Right from "./components/Right";
import { Authenticate } from "api/user";
import Header from "./components/Header";
import Default from "ui/layouts/Default";
import { CreateProject } from "api/project";
import { AFFILIATES, TASKS } from "api/data";

type ProjectsProps = {
  user: Record<string, any>;
};

export default function Projects(props: ProjectsProps) {
  const router = useRouter();

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

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    name: "",
    description: "",
    tasks: [...TASKS],
    affiliation: affiliateOptions[0],
    duration: durationOptions[1],
    required_people: 1,
    accepting: true,
  });

  const submit = async () => {
    setLoading(true);
    const data: any = { ...params };

    const tasks = data.tasks
      .filter((t: Record<string, any>) => t.selected)
      .map((t: Record<string, any>) => t.label);
    data.tasks = tasks;

    data.duration = data.duration.value;
    data.affiliation = data.affiliation.label;

    const token = cookie.get("WESPARK-TOKEN") as string;

    const [response, error] = await CreateProject(
      data.name,
      data.description,
      data.tasks,
      data.affiliation,
      data.duration,
      data.required_people,
      token
    );

    setLoading(false);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("You are not authorized to do this!");
          break;
        default:
          console.log(error.response);
          toast.error("An unknown error occured!");
          break;
      }
      return;
    }

    router.push(`/u/${props.user.user_id}`);
  };

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-4">
        <Header />
        <div className="grid w-full grid-cols-2 items-start gap-x-4">
          <Left params={params} setParams={setParams} durationOptions={durationOptions} />
          <Right
            loading={loading}
            setLoading={setLoading}
            params={params}
            setParams={setParams}
            affiliateOptions={affiliateOptions}
            submit={submit}
          />
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
