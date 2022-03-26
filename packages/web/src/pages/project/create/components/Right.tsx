import Select from "./Select";
import Dropdown from "./Dropdown";

type RightProps = {
  params: Record<string, any>;
  setParams: (p: any) => void;
  affiliateOptions: Record<string, any>[];
};

function Right(props: RightProps): JSX.Element {
  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <div className="flex flex-col space-y-6 rounded-2xl border-2 border-dark-500 bg-white bg-opacity-5 p-8">
        <p className="font-monument text-3xl text-white">Details</p>
        <div className="flex w-full flex-col space-y-4">
          <Dropdown
            icon="fas fa-link"
            label="Primary Affiliation"
            value={props.params.affiliation}
            options={props.affiliateOptions}
            setValue={(v) =>
              props.setParams((p: Record<string, any>) => ({ ...p, affiliation: v }))
            }
          />
          <Select label="Tasks Required" params={props.params} setParams={props.setParams} />
        </div>
      </div>
      <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-dark-500 bg-white bg-opacity-5 p-8">
        <div className="flex flex-col space-y-3">
          <p className="font-monument text-3xl text-white">Submit</p>
          <p className="text-lg text-white text-opacity-80">
            Posting this project will send it for approval to WE-SPARK&apos;s administrators. Once
            approved, this project will be available to students with the required subset of skills
            that you have listed.
          </p>
        </div>

        <div className="flex justify-center self-end rounded-2xl bg-blue-800 px-6 py-3 hover:bg-blue-900">
          <p className="select-none text-xl text-white">Submit</p>
        </div>
      </div>
    </div>
  );
}

export default Right;
