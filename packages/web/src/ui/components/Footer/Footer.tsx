import { Fragment } from "react";
import { useRouter } from "next/router";

function Footer(): JSX.Element {
  const router = useRouter();

  return (
    <div className="!mt-40 flex w-full flex-col space-y-4">
      <div className="h-1 w-full rounded-full bg-white bg-opacity-5"></div>
      <div className="flex w-full items-center justify-between">
        <p className="text-xl text-white text-opacity-60">
          Developed by{" "}
          <a
            className="text-white"
            href="https://kevinthomas.codes/"
            target="_blank"
            rel="noreferrer"
          >
            Kevin Thomas
          </a>{" "}
          for{" "}
          <a className="text-white" href="https://winhacks.ca/" target="_blank" rel="noreferrer">
            WinHacks 2022
          </a>
          {router.pathname === "/" && (
            <Fragment>
              {" "}
              • Landing page inspired from{" "}
              <a
                className="text-white"
                href="https://dribbble.com/shots/16835188-SaaS-Landing-page-Team-Management-software/"
                target="_blank"
                rel="noreferrer"
              >
                Dribbble
              </a>
            </Fragment>
          )}
        </p>
        <a href="https://github.com/kevinjosethomas/winhacks-2022" target="_blank" rel="noreferrer">
          <i className="fab fa-github text-xl text-white text-opacity-60 transition duration-300 hover:text-opacity-100" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
