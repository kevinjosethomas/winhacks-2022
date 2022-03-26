import Link from "next/link";

type HeaderProps = {
  user: Record<string, any>;
};

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="font-monument text-5xl text-white">Project Opportunities</p>
      {(props.user.type === 2 || props.user.type === 3) && (
        <Link href="/project/create">
          <a className="flex items-center rounded-xl bg-blue-800 px-6 py-2 transition duration-300 hover:bg-blue-900">
            <p className="select-none text-xl text-white">Create Project</p>
          </a>
        </Link>
      )}
    </div>
  );
}

export default Header;
