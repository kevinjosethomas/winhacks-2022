import Link from "next/link";

type NavbarProps = {};

function Navbar(props: NavbarProps): JSX.Element {
  const links = [
    {
      label: "Students",
      href: "/students",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Partners",
      href: "/partners",
    },
    {
      label: "Admins",
      href: "/admins",
    },
  ];

  return (
    <div className="flex items-center justify-between py-6">
      <Link href="/">
        <a className="text-white text-3xl font-monument select-none text-blue-500">wespark</a>
      </Link>
      <div className="flex items-center space-x-8">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <a className="text-white text-xl text-opacity-90 hover:text-opacity-100 transition duration-300">
              {link.label}
            </a>
          </Link>
        ))}
      </div>
      <Link href="/onboarding">
        <a className="flex items-center bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300 px-6 rounded-lg py-2">
          <p className="text-white text-xl select-none">Get Started</p>
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
