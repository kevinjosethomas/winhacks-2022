import { ChangeEventHandler } from "react";

type TextAreaProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler;
};

function Input(props: TextAreaProps): JSX.Element {
  return (
    <div className="flex w-full flex-col space-y-1">
      <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      <div className="flex items-center space-x-3 rounded-xl bg-white bg-opacity-5 p-4">
        <textarea
          value={props.value}
          onChange={props.onChange}
          className="h-[28rem] w-full resize-none bg-transparent text-xl text-white text-opacity-80 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Input;
