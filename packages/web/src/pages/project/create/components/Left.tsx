import { ChangeEvent } from "react";

import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "./Dropdown";

type LeftProps = {
  params: Record<string, any>;
  setParams: (p: any) => void;
  durationOptions: Record<string, any>[];
};

function Left(props: LeftProps): JSX.Element {
  const onChange = (key: string, e: ChangeEvent<HTMLInputElement>, max: number) => {
    if (key === "required_people") {
      let value = parseInt(e.target.value.replace(/[^0-9\\.]+/g, "")) || 0;

      if (value > 1000) {
        return;
      }

      props.setParams({ ...props.params, [key]: value });
      return;
    }

    props.setParams((p: Record<string, any>) => ({
      ...p,
      [key]: e.target.value.substring(0, max),
    }));
  };

  return (
    <div className="flex h-full w-full flex-col space-y-6 rounded-2xl border-2 border-dark-500 bg-white bg-opacity-5 p-8">
      <p className="font-monument text-3xl text-white">Information</p>
      <div className="flex w-full flex-col space-y-4">
        <Input
          icon="fas fa-user-circle"
          value={props.params.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("name", e, 32)}
          label="Project Name"
        />
        <TextArea
          value={props.params.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("description", e, 1000)}
          label="Project Description"
        />
        <Dropdown
          icon="fas fa-calendar"
          label="Project Duration"
          value={props.params.duration}
          options={props.durationOptions}
          setValue={(v) => props.setParams((p: Record<string, any>) => ({ ...p, duration: v }))}
        />
        <Input
          icon="fas fa-users"
          label="Maximum Students"
          value={props.params.required_people}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange("required_people", e, 0)}
        />
      </div>
    </div>
  );
}

export default Left;
