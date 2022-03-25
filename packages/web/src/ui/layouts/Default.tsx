import { ReactNode } from "react";

type DefaultProps = {
  children?: ReactNode;
};

function Default(props: DefaultProps): JSX.Element {
  return (
    <div className="grid w-screen min-h-screen bg-black">
      <div className="flex flex-col w-full h-full"></div>
    </div>
  );
}

export default Default;
