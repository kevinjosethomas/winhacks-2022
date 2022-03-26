type SelectProps = {
  label: string;
  params: Record<string, any>;
  setParams: (params: Record<string, any>) => void;
};

function Select(props: SelectProps): JSX.Element {
  const select = (index: number) => {
    const tasks = [...props.params.tasks];
    tasks[index].selected = !tasks[index].selected;

    props.setParams((p: Record<string, any>) => ({ ...p, tasks }));
  };

  return (
    <div className="flex flex-col items-start space-y-1">
      <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      <div className="flex flex-col items-start space-y-2">
        {props.params.tasks.map((task: Record<string, any>, index: number) => (
          <div
            className="group flex cursor-pointer items-center space-x-2"
            key={index}
            onClick={() => select(index)}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded ${
                task.selected ? "bg-blue-500" : "bg-dark-200 group-hover:bg-dark-100"
              } transition duration-300`}
            >
              {task.selected && <i className="far fa-check text-sm text-white" />}
            </div>
            <p
              className={`select-none text-xl text-white  ${
                task.selected ? "text-opacity-100" : "text-opacity-80 group-hover:text-opacity-100"
              } transition duration-300`}
            >
              {task.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
