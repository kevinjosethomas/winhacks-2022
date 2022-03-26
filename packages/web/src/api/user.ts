import axios from "axios";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

const CreateUser = async (name: string, email: string, password: string, type: number) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
      name,
      email,
      password,
      type,
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      email,
      password,
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const Authenticate = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("WESPARK-TOKEN");

    if (!token) {
      return [null, 1];
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { CreateUser, Login, Authenticate };
