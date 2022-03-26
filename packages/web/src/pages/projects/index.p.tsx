import { GetServerSidePropsContext } from "next";

import { Authenticate } from "api/user";
import Default from "ui/layouts/Default";
import Header from "./index/components/Header";
import Project from "./index/components/Project";

type ProjectsProps = {
  user: Record<string, any>;
};

const PROJECTS = [
  {
    project_id: 1,
    name: "Teaching @ Maywood Secondary School",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, massa id convallis congue, sem felis placerat velit, a placerat justo orci nec sem. Proin ultrices ligula erat. In scelerisque tempus ante, ut tristique felis mattis in. Donec et magna nisl. Integer risus quam, sodales vitae egestas fringilla, semper vitae lectus. Cras congue odio dolor. Ut molestie dolor a augue ultricies tempor. Suspendisse luctus, lectus porttitor lacinia sodales, lorem mauris ullamcorper leo, tristique condimentum neque tortor nec ipsum. Quisque ante metus, scelerisque vel est vel, finibus egestas neque.",
    tasks: ["Data Analytics", "Graphic Design", "Literature Review"],
    affiliation: "St. Clair College",
    duration: 1,
    required_people: 10,
    accepting: true,
    approved: true,
  },
];

export default function Projects(props: ProjectsProps) {
  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-8">
        <Header user={props.user} />
        <div className="flex w-full flex-col items-start justify-start">
          {PROJECTS.map((project, index) => (
            <Project key={index} {...project} />
          ))}
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
