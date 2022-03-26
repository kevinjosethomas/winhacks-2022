import cookie from "js-cookie";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";

import Input from "./Input";
import Select from "./Select";
import { CreateUser } from "api/user";

function SignUp(): JSX.Element {
  const [params, setParams] = useState({
    name: "",
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

  const submit = async () => {
    const [response, error] = await CreateUser(
      params.name,
      params.email,
      params.password,
      params.type
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("You are not authorized to do this!");
          break;
        case 409:
          toast.error("This username or email is takne");
          break;
        default:
          console.log(error.response);
          toast.error("An unknown error occured!");
          break;
      }
      return;
    }

    cookie.set("WESPARK-TOKEN", response.payload.token, {
      secure: true,
      sameSite: "strict",
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <p className="text-4xl text-white font-monument select-none">Sign Up</p>
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          icon="fas fa-user-circle"
          label="Full Name"
          value={params.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("name", e, 16)}
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
      <div
        className="flex justify-center bg-blue-600 rounded-xl hover:bg-blue-800 transition duration-300 py-3 cursor-pointer"
        onClick={submit}
      >
        <p className="text-2xl text-white select-none">Create Account</p>
      </div>
    </div>
  );
}

export default SignUp;
