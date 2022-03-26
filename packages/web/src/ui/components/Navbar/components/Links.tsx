import Link from "next/link";

function Links(): JSX.Element {
  const links = [
    {
      label: "Students",
      href: "/students",
    },
    {
      label: "Partners",
      href: "/partners",
    },
    {
      label: "Projects",
      href: "/projects",
    },

    {
      label: "Admin",
      href: "/admin",
    },
  ];

  return (
    <div className="flex items-center space-x-8">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <a className="text-xl text-white text-opacity-90 transition duration-300 hover:text-opacity-100">
            {link.label}
          </a>
        </Link>
      ))}
    </div>
  );
}

export default Links;
