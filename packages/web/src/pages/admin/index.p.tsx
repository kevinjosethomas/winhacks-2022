import toast from "react-hot-toast";
import { GetServerSidePropsContext } from "next";
import { Fragment, useEffect, useState } from "react";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import { GetProjects } from "api/project";
import Project from "./components/Project";

type AdminProps = {
  user: Record<string, any>;
};

export default function Admin(props: AdminProps) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const [response, error] = await GetProjects(false);

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
        <p className="font-monument text-5xl text-white">Project Approval</p>
        <div className="flex w-full flex-col items-center justify-center">
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
                  No projects are pending approval!
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
