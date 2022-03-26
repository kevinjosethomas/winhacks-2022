import axios from "axios";

const CreateProject = async (
  name: string,
  description: string,
  tasks: string[],
  affiliation: string,
  duration: number,
  required_people: number,
  token: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/project/create`,
      {
        name,
        description,
        tasks,
        affiliation,
        duration,
        required_people,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const GetProjects = async (approved: boolean) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/project/list?approved=${approved}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const ApproveProject = async (id: number, token: string) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/project/${id}/approve`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { CreateProject, GetProjects, ApproveProject };
