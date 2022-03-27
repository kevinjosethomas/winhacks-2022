import axios from "axios";

const CreateApplication = async (
  id: number,
  interests: string,
  qualifications: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/project/${id}/apply`,
      {
        interests,
        qualifications,
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

export { CreateApplication };
