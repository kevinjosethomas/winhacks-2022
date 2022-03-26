import Link from "next/link";
import cookies from "js-cookie";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";
import OutsideClickHandler from "react-outside-click-handler";

type DropdownProps = {
  user: Record<string, any>;
  showDropdown: (showDropdown: boolean) => void;
};

type ElementProps = {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

function Dropdown(props: DropdownProps): JSX.Element {
  const router = useRouter();

  return (
    <OutsideClickHandler onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-16 right-0 z-40 flex w-64 flex-col rounded-2xl bg-blue-900 py-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Element icon="fas fa-user-circle" label="View Profile" href={`/u/${props.user.user_id}`} />
        {props.user.type === 1 ? (
          <Element icon="fas fa-search" label="Find Projects" href="/projects" />
        ) : props.user.type === 2 ? (
          <Element icon="fas fa-project-diagram" label="Manage Projects" href="/projects/my" />
        ) : (
          <Element icon="fas fa-tools" label="Admin Dash" href="/admin" />
        )}
        <Element
          icon="fas fa-sign-out"
          label="Log Out"
          onClick={() => {
            cookies.remove("WESPARK-TOKEN");
            router.reload();
          }}
        />
      </motion.div>
    </OutsideClickHandler>
  );
}

function Element(props: ElementProps): JSX.Element {
  const Container = ({ children }: { children: ReactNode }): JSX.Element => {
    if (props.href) {
      return <Link href={props.href}>{children}</Link>;
    } else {
      return <Fragment>{children}</Fragment>;
    }
  };

  return (
    <Container>
      <a
        className="flex w-full cursor-pointer select-none items-center space-x-2 py-2 px-4 transition duration-300 hover:bg-black hover:bg-opacity-20"
        onClick={props.onClick}
      >
        <i className={`${props.icon} w-[25px] text-center text-xl text-white`} />
        <p className="text-xl text-white">{props.label}</p>
      </a>
    </Container>
  );
}

export default Dropdown;
