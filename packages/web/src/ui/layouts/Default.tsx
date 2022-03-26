import { ReactNode } from "react";

import Navbar from "ui/components/Navbar/Navbar";

type DefaultProps = {
  children?: ReactNode;
};

function Default(props: DefaultProps): JSX.Element {
  return (
    <div className="grid justify-center w-screen min-h-screen h-full bg-dark-700 overflow-hidden">
      <div className="flex flex-col w-full h-full w-[1200px] space-y-10">
        <Navbar />
        <div className="flex flex-col w-full">{props.children}</div>
      </div>
    </div>
  );
}

export default Default;
