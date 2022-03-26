import Link from "next/link";

function GetStarted(): JSX.Element {
  return (
    <Link href="/onboarding">
      <a className="flex items-center bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300 px-6 rounded-lg py-2">
        <p className="text-white text-xl select-none">Get Started</p>
      </a>
    </Link>
  );
}

export default GetStarted;
