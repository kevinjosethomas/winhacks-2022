import cookie from "js-cookie";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";

import Input from "./Input";
import { Login as LoginUser } from "api/user";

function Login(): JSX.Element {
  const [params, setParams] = useState({
    email: "",
    password: "",
  });

  const onChange = (key: string, e: ChangeEvent<HTMLInputElement>, max: number) => {
    setParams((p) => ({
      ...p,
      [key]: e.target.value.substring(0, max),
    }));
  };

  const submit = async () => {
    const [response, error] = await LoginUser(params.email, params.password);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("Invalid username or password!");
          break;
        case 404:
          toast.error("There is no account associated with the provided email!");
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
    <div className="flex flex-col space-y-6 justify-start h-full">
      <p className="text-4xl text-white font-monument select-none">Log In</p>
      <div className="flex flex-col space-y-4">
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
      </div>
      <div
        className="flex justify-center bg-blue-600 rounded-xl hover:bg-blue-800 transition duration-300 py-3 cursor-pointer"
        onClick={submit}
      >
        <p className="text-2xl text-white select-none">Login</p>
      </div>
    </div>
  );
}

export default Login;
