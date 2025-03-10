interface Props {
  name: string;
  value: string;
  calculating: boolean;
  calculatingString?: string;
}
const ReadOnlyInput = ({
  name,
  value,
  calculating,
  calculatingString,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <label className="sm:max-w-[14ch] w-full flex sm:block">{name}</label>
      <div className="w-full sm:w-[400px] md:w-[455.5px] flex flex-col gap-4">
        <input
          value={calculating ? calculatingString : `$${value}`}
          readOnly
          className="h-[58px] w-full px-5 sm:px-[33.21px] bg-secondary text-primary font-semibold text-[16px] leading-[26.57px] rounded-[7.59px]"
        />
      </div>
    </div>
  );
};

export default ReadOnlyInput;
