import { appearFromCenter, fadeInFromXY } from "@/animations/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CalculatorInput from "./calculator-input";
import MonthSelect from "./select-months";
import ReadOnlyInput from "./read-only-input";
import cx from "@/libs/cx";

const api = import.meta.env.VITE_API;

interface Props {
  dictionary: Calculator;
  id: string;
  target: string;
}

const Calculator = ({ dictionary, id, target }: Props) => {
  const [calculatorRef, calculatorInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [amount, setAmount] = useState<number | string>(1000);
  const [months, setMonths] = useState<number | null>(null);
  const [installmentValue, setInstallmentValue] = useState<string>("0.00");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleFetchInstallment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newAmount = Number(amount);
    if (!newAmount || months === null || months <= 0) return;

    setIsCalculating(true);

    try {
      const queryParams = new URLSearchParams({
        amount: Number(newAmount).toString(),
        month: months.toString(),
      });

      const response = await fetch(`${api}credit-calc/?${queryParams}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setInstallmentValue(data.credit_quota?.toFixed(2) || "0.00");
    } catch (error) {
      console.error("Error fetching installment:", error);
      setInstallmentValue("0.00");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section
      ref={calculatorRef}
      id={id}
      className="flex items-center justify-center pt-[65px] mx-5 w-[calc(100%-40px)] sm:w-auto"
    >
      <motion.div
        variants={fadeInFromXY(0, 0, 0)}
        initial="initial"
        animate={calculatorInView ? "animate" : "initial"}
        transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
        className="flex flex-col gap-10 sm:gap-[59px] shadow-2xl py-[24px] min-h-[603px] rounded-[12px] w-full md:w-[914px] sm:px-5 md:px-0"
      >
        <motion.div
          className="text-center"
          variants={fadeInFromXY(0, -100, 0)}
          initial="initial"
          animate={calculatorInView ? "animate" : "initial"}
          transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
        >
          <h3 className="title-style mx-auto hidden sm:block">
            {dictionary?.title?.[0]}
          </h3>
          <h3 className="title-style max-w-[11ch] mx-auto sm:hidden">
            {dictionary?.title?.[1]}
          </h3>
        </motion.div>
        <form className="px-5 lg:pl-[123px] sm:self-center lg:self-auto flex flex-col gap-4 text-base sm:text-[20px] sm:leading-[30px] text-primary font-semibold tracking-[-0.41px]">
          <motion.div
            className="flex flex-col gap-4"
            variants={appearFromCenter}
            initial="initial"
            animate={calculatorInView ? "animate" : "initial"}
            transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
          >
            <CalculatorInput
              name={dictionary?.form?.inputs?.[0]?.name}
              amount={amount}
              setAmount={setAmount}
            />

            <MonthSelect
              name={dictionary?.form?.inputs?.[1]?.name}
              months={months}
              setMonths={setMonths}
              loadingText={dictionary?.form?.inputs?.[1]?.loading}
              errorText={dictionary?.form?.inputs?.[1]?.error}
            />

            <ReadOnlyInput
              name={dictionary?.form?.inputs?.[2]?.name}
              value={installmentValue}
              calculating={isCalculating}
              calculatingString={
                dictionary?.form?.inputs?.[2]?.calculatingString
              }
            />
            <div className="w-full flex flex-col sm:flex-row sm:gap-6">
              <div className="sm:max-w-[14ch] w-full flex sm:block" />
              <div className="text-tertiary font-medium text-[13px] leading-[19.5px] tracking-[-0.43px]">
                <p> {dictionary?.form?.inputs?.[2]?.["input-notes"]}</p>
                <a
                  href={`#${target}`}
                  className={cx(
                    "duration-300 text-primary",
                    Number(amount) > 4000
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  )}
                >
                  <p>
                    {dictionary?.form?.inputs?.[2]?.excess
                      ?.split(" ")
                      .slice(0, -1)
                      .join(" ")}{" "}
                    <span className="underline">
                      {dictionary?.form?.inputs?.[2]?.excess
                        ?.split(" ")
                        .slice(-1)}
                    </span>
                    ''{" "}
                  </p>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={appearFromCenter}
            initial="initial"
            animate={calculatorInView ? "animate" : "initial"}
            transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
            className="self-center sm:self-start ml-0 sm:ml-[205px]"
          >
            <button
              className={cx(
                "button-form tracking-[0px]",
                Number(amount) > 4000 && "pointer-events-none"
              )}
              onClick={handleFetchInstallment}
            >
              {dictionary?.form?.button?.name}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default Calculator;
