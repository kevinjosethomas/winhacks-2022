import { ChangeEvent, useState } from "react";

import Input from "./Input";
import Select from "./Select";

type SignUpProps = {};

function SignUp(props: SignUpProps): JSX.Element {
  const [params, setParams] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    type: 1,
  });

  const onChange = (key: string, e: ChangeEvent<HTMLInputElement>, max: number) => {
    setParams((p) => ({
      ...p,
      [key]: e.target.value.substring(0, max),
    }));
  };

  const options = [
    {
      value: 1,
      label: "Student",
    },
    {
      value: 2,
      label: "Partner",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <p className="text-4xl text-white font-monument select-none">Sign Up</p>
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          icon="fas fa-user-circle"
          label="Username"
          value={params.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("username", e, 16)}
        />
        <Input
          type="email"
          icon="far fa-at"
          label="Email"
          value={params.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("email", e, 200)}
        />
        <Input
          type="password"
          icon="fas fa-lock"
          label="Password"
          value={params.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("password", e, 32)}
        />
        <Select
          label="Account Type"
          options={options}
          value={params.type}
          setValue={(v: number) => setParams((p) => ({ ...p, type: v }))}
        />
      </div>
      <div className="flex justify-center bg-blue-600 rounded-xl hover:bg-blue-800 transition duration-300 py-3 cursor-pointer">
        <p className="text-2xl text-white select-none">Create Account</p>
      </div>
    </div>
  );
}

export default SignUp;
