import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Apply from "../modals/Apply";

type ProjectProps = {
  project_id: number;
  name: string;
  description: string;
  tasks: string[];
  required_people: number;
  affiliation: string;
  duration: number;
};

function Project(props: ProjectProps): JSX.Element {
  const [modal, showModal] = useState(false);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-dark-500 bg-white bg-opacity-5">
      <AnimatePresence>{modal && <Apply showModal={showModal} {...props} />}</AnimatePresence>
      <div className="flex w-full items-center justify-between p-5">
        <p className="text-2xl text-white">{props.name}</p>
        <div
          className="flex cursor-pointer items-center justify-center rounded-2xl bg-blue-800 px-6 py-2 transition duration-300 hover:bg-blue-900"
          onClick={() => showModal(true)}
        >
          <p className="text-xl text-white">Apply</p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between space-y-4 space-x-4 bg-dark-500 p-5">
        <div className="flex w-full flex-col items-start justify-center space-y-4 self-start">
          <p className="text-white text-opacity-80">{props.description}</p>
          <div className="flex items-center space-x-2">
            {props.tasks.map((task: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg bg-black bg-opacity-40 px-5 py-0.5"
              >
                <p className="select-none text-lg text-white text-opacity-90">{task}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-5/6 w-1 rounded-full bg-white bg-opacity-20" />
        <div className="flex w-[32rem] flex-col space-y-1">
          <div className="flex items-center space-x-3">
            <i className="fas fa-clock w-[25px] text-center text-xl text-white text-opacity-90" />
            <p className="text-xl text-white text-opacity-90">
              Duration:{" "}
              {props.duration === 0
                ? "<1 month"
                : props.duration === 1
                ? "1 month"
                : props.duration === 3
                ? "3 months"
                : "6 months"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-users w-[25px] text-center text-xl text-white text-opacity-90" />
            <p className="text-xl text-white text-opacity-90">
              {props.required_people} student{props.required_people !== 1 && "s"} required
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <i className="fas fa-link w-[25px] text-center text-xl text-white text-opacity-90" />
            <p className="text-xl text-white text-opacity-90">{props.affiliation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
