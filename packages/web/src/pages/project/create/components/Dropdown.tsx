import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";

type DropdownContainerProps = {
  icon: string;
  label: string;
  value: Record<string, any>;
  options: Record<string, any>[];
  setValue: (p: any) => void;
};

type DropdownProps = {
  value: Record<string, any>;
  options: Record<string, any>[];
  setValue: (p: any) => void;
  showDropdown: (p: boolean) => void;
};

function DropdownContainer(props: DropdownContainerProps): JSX.Element {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative flex w-full flex-col">
      <p className="mb-1 text-2xl text-white text-opacity-90">{props.label}</p>
      <div
        className="flex cursor-pointer items-center justify-between rounded-xl bg-white bg-opacity-5 px-6 py-3 transition duration-500 hover:bg-opacity-10"
        onClick={() => showDropdown((dd) => !dd)}
      >
        <div className="flex items-center space-x-3">
          <i className={`${props.icon} text-xl text-white text-opacity-80`} />
          <p className="select-none text-xl text-white text-opacity-80">{props.value.label}</p>
        </div>
        <i className="far fa-angle-down text-xl text-white text-opacity-80" />
      </div>
      <AnimatePresence>
        {dropdown && (
          <Dropdown
            options={props.options}
            value={props.value}
            setValue={props.setValue}
            showDropdown={showDropdown}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Dropdown(props: DropdownProps): JSX.Element {
  return (
    <OutsideClickHandler onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="left-0flex absolute top-[6rem] w-full flex-col rounded-xl border-2 border-dark-200 bg-dark-500 py-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.options.map((option: Record<string, any>, index: number) => (
          <div
            key={index}
            className={`flex w-full items-center py-1.5 px-4 ${
              option.value === props.value.value
                ? "bg-black bg-opacity-20"
                : "cursor-pointer transition duration-300 hover:bg-black hover:bg-opacity-20"
            }`}
            onClick={() => {
              props.setValue(option);
              props.showDropdown(false);
            }}
          >
            <p className="select-none text-xl text-white text-opacity-80">{option.label}</p>
          </div>
        ))}
      </motion.div>
    </OutsideClickHandler>
  );
}

export default DropdownContainer;
