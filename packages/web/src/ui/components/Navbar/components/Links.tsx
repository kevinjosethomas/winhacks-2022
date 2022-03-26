import Link from "next/link";

function Links(): JSX.Element {
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
    <div className="flex items-center space-x-8">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <a className="text-white text-xl text-opacity-90 hover:text-opacity-100 transition duration-300">
            {link.label}
          </a>
        </Link>
      ))}
    </div>
  );
}

export default Links;
