import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "ui/layouts/Modal";
import TextArea from "../components/TextArea";
import { CreateApplication } from "api/application";

type ApplyProps = {
  project_id: number;
  name: string;
  description: string;
  tasks: string[];
  required_people: number;
  affiliation: string;
  duration: number;
  showModal: (show: boolean) => void;
};

function Apply(props: ApplyProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [interests, setInterests] = useState("");
  const [qualifications, setQualifications] = useState("");

  const submit = async () => {
    setLoading(true);

    const token = cookie.get("WESPARK-TOKEN") as string;
    const [response, error] = await CreateApplication(
      props.project_id,
      interests,
      qualifications,
      token
    );

    setLoading(false);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("You are not logged in!");
          break;
        default:
          toast.error("An unknown error occurred!");
          break;
      }
      return;
    }

    toast.success("Successfully sent your application!");
    props.showModal(false);
  };

  return (
    <Modal showModal={props.showModal}>
      <div
        className="flex w-full w-[1200px] flex-col space-y-6 rounded-2xl border-2 border-dark-500 bg-dark-600 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <h1 className="font-monument text-4xl text-white">{props.name}</h1>
          <p className="text-xl text-white text-opacity-80">
            Send in an application for this project. Describe your qualifications and your interests
            in this field of work!
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <TextArea
            label="Why are you interested in this project?"
            value={interests}
            onChange={(e: any) => setInterests(e.target.value.substring(0, 500))}
          />
          <TextArea
            label="How are you qualified for this project?"
            value={qualifications}
            onChange={(e: any) => setQualifications(e.target.value.substring(0, 500))}
          />
        </div>
        <div className="flex flex-row items-center justify-end space-x-3">
          <div
            onClick={() => props.showModal(false)}
            className="flex cursor-pointer items-center justify-center rounded-2xl bg-dark-400 py-3 px-6 transition duration-300 hover:bg-dark-300"
          >
            <p className="text-xl text-white">Cancel</p>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded-2xl bg-blue-800 py-3 px-6 transition duration-300 hover:bg-blue-900"
            onClick={() => {
              if (!loading) submit();
            }}
          >
            {loading ? (
              <img src="/images/loading.svg" alt="Loading" className="w-7" />
            ) : (
              <p className="text-xl text-white">Send Application</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Apply;
