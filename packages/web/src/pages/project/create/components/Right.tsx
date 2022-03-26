type RightProps = {
  params: Record<string, any>;
  setParams: (p: any) => void;
};

function Right(props: RightProps): JSX.Element {
  return (
    <div className="flex w-full flex-col rounded-2xl border-2 border-dark-500 bg-white bg-opacity-5"></div>
  );
}

export default Right;
