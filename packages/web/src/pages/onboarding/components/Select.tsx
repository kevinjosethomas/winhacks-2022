type InputProps = {
  label: string;
  value: number;
  options: Record<string, any>[];
  setValue: (v: number) => void;
};

function Select(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      <div className="flex flex-row items-center w-full bg-white bg-opacity-5 rounded-xl overflow-hidden ">
        {props.options.map((option, index) => (
          <div
            key={index}
            className={`flex justify-center w-full py-3 ${
              props.value === option.value
                ? "bg-blue-600"
                : "cursor-pointer hover:bg-white hover:bg-opacity-10 transition duration-300"
            } rounded-xl`}
            onClick={() => props.setValue(option.value)}
          >
            <p className="text-white text-xl select-none">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
