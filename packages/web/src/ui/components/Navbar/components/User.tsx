import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

type UserProps = {
  user: Record<string, any>;
};

function User(props: UserProps): JSX.Element {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center space-x-3 rounded-2xl bg-blue-900 px-6 py-2 transition duration-300 hover:bg-blue-800"
        onClick={() => showDropdown((d) => !d)}
      >
        <i className="fas fa-user-circle text-3xl text-white" />
        <div className="flex select-none flex-col">
          <p className="text-white">{props.user.name}</p>
          <p className="text-xs text-white text-opacity-80">View Menu</p>
        </div>
      </div>
      <AnimatePresence>
        {dropdown && <Dropdown user={props.user} showDropdown={showDropdown} />}
      </AnimatePresence>
    </div>
  );
}

export default User;
