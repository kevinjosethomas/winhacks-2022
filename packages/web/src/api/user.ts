import axios from "axios";

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

export { CreateUser, Login };
