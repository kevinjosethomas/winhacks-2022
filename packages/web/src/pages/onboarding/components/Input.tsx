import { ChangeEventHandler } from "react";

type InputProps = {
  icon: string;
  label: string;
  value: string;
  type: string;
  onChange: ChangeEventHandler;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      <div className="flex items-center bg-white bg-opacity-5 space-x-3 px-6 py-3 rounded-xl">
        <i className={`${props.icon} text-white text-xl text-opacity-80`} />
        <input
          value={props.value}
          onChange={props.onChange}
          className="w-80 bg-transparent focus:outline-none text-white text-xl text-opacity-80"
          type={props.type}
        />
      </div>
    </div>
  );
}

export default Input;
