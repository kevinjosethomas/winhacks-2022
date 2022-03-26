import { ChangeEventHandler } from "react";

type InputProps = {
  icon: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex w-full flex-col space-y-1">
      <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      <div className="flex items-center space-x-3 rounded-xl bg-white bg-opacity-5 px-6 py-3">
        <i className={`${props.icon} text-xl text-white text-opacity-80`} />
        <input
          value={props.value}
          onChange={props.onChange}
          className="w-full bg-transparent text-xl text-white text-opacity-80 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Input;
