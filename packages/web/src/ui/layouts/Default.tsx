import { ReactNode } from "react";

import Navbar from "ui/components/Navbar/Navbar";
import Footer from "ui/components/Footer/Footer";

type DefaultProps = {
  children?: ReactNode;
  user?: Record<string, any>;
};

function Default(props: DefaultProps): JSX.Element {
  return (
    <div className="grid h-full min-h-screen w-screen justify-center overflow-hidden bg-dark-700 pb-20">
      <div className="flex h-full w-full w-[1200px] flex-col space-y-10">
        <Navbar user={props.user} />
        <div className="flex h-full w-full flex-col">{props.children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Default;
