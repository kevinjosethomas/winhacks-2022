import toast from "react-hot-toast";
import { GetServerSidePropsContext } from "next";
import { Fragment, useEffect, useState } from "react";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import { GetProjects } from "api/project";
import Header from "./index/components/Header";
import Project from "./index/components/Project";

type ProjectsProps = {
  user: Record<string, any>;
};

export default function Projects(props: ProjectsProps) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const [response, error] = await GetProjects(true);

      if (error) {
        toast.error("Failed to fetch projects!");
        return;
      }

      setProjects(response.payload);
      setLoading(false);
    })();
  }, []);

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-8">
        <Header user={props.user} />
        <div className="flex w-full flex-col items-start justify-start space-y-4">
          {loading ? (
            <img src="/images/loading.svg" alt="Loading" className="w-24" />
          ) : (
            <Fragment>
              {projects.length ? (
                <Fragment>
                  {projects.map((project: any, index: number) => (
                    <Project key={index} {...project} />
                  ))}
                </Fragment>
              ) : (
                <p className="text-4xl text-white text-opacity-90">
                  No project opportunities are available right now!
                </p>
              )}
            </Fragment>
          )}
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
