import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import Input from "./Input";
import { Login as LoginUser } from "api/user";

function Login(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const [response, error] = await LoginUser(params.email, params.password);
    setLoading(false);

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

    router.push("/");
  };

  return (
    <div className="flex h-full flex-col justify-start space-y-6">
      <p className="font-monument select-none text-4xl text-white">Log In</p>
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
        className="flex cursor-pointer justify-center rounded-xl bg-blue-600 py-3 transition duration-300 hover:bg-blue-800"
        onClick={() => {
          if (!loading) submit();
        }}
      >
        {loading ? (
          <img src="/images/loading.svg" className="w-8" alt="Loading" />
        ) : (
          <p className="select-none text-2xl text-white">Login</p>
        )}
      </div>
    </div>
  );
}

export default Login;
