interface Props {
  name: string;
  amount: number | string;
  setAmount: (amount: string) => void;
}
const CalculatorInput = ({ name, amount, setAmount }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    newValue = newValue.replace(/^0+/, "");
    setAmount(newValue);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <label className="max-w-[14ch] w-full">{name} U$:</label>
      <input
        required
        type="text"
        value={amount}
        onInput={handleInputChange}
        placeholder="Enter amount"
        min="1000"
        pattern="^\d+$"
        step="1"
        className="w-full md:w-[455.5px] sm:w-[400px] h-[58px] px-5 sm:px-[33.21px] bg-secondary text-primary font-semibold text-[16px] leading-[26.57px] rounded-[7.59px]"
      />
    </div>
  );
};

export default CalculatorInput;
