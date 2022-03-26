import User from "./components/User";
import Brand from "./components/Brand";
import Links from "./components/Links";
import GetStarted from "./components/GetStarted";

type NavbarProps = {
  user?: Record<string, any>;
};

function Navbar(props: NavbarProps): JSX.Element {
  return (
    <div className="flex items-center justify-between py-6">
      <Brand />
      <Links />
      {props.user ? <User user={props.user} /> : <GetStarted />}
    </div>
  );
}

export default Navbar;
