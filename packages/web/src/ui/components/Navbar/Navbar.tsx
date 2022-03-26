import Link from "next/link";

import Brand from "./components/Brand";
import Links from "./components/Links";

type NavbarProps = {
  user?: Record<string, any>;
};

function Navbar(props: NavbarProps): JSX.Element {
  return (
    <div className="flex items-center justify-between py-6">
      <Brand />
      <Links />
      <Link href="/onboarding">
        <a className="flex items-center bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300 px-6 rounded-lg py-2">
          <p className="text-white text-xl select-none">Get Started</p>
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
