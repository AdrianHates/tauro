import useFetch from "@/hooks/useFetch";
import useToggle from "@/hooks/useToggle";
import cx from "@/libs/cx";
import { useEffect, useRef, useState } from "react";

const api = import.meta.env.VITE_API;

const MonthSelect = ({
  name,
  months,
  setMonths,
  loadingText,
  errorText,
}: {
  loadingText?: string;
  errorText?: string;
  name: string;
  months: number | null;
  setMonths: (value: number) => void;
}) => {
  const {
    data: monthOptions,
    loading,
    error,
  } = useFetch<{ [key: string]: number }>(`${api}credit-month/`);
  const { isOpen, onToggle } = useToggle();
  const [selectElementIndex, setSelectElementIndex] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onToggle();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  useEffect(() => {
    if (!loading && monthOptions && Object.values(monthOptions).length > 0) {
      const firstValue = Object.values(monthOptions)[0];
      setMonths(firstValue);
    }
  }, [loading, monthOptions, setMonths]);

  useEffect(() => {
    if (months) {
      setSelectElementIndex(months);
    }
  }, [loading, months]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <label className="max-w-[14ch] w-full">{name}:</label>
      <div
        ref={containerRef}
        onClick={() => {
          onToggle();
          setSelectElementIndex(months);
        }}
        className={cx(
          "flex cursor-pointer border-2 border-secondary items-center relative sm:w-[400px] md:w-[455.5px] h-[58px] px-5 sm:pl-[33.21px] bg-secondary text-primary font-semibold text-[16px] leading-[26.57px] rounded-[7.59px]",
          isOpen && "border-black"
        )}
      >
        {loading && <option>{loadingText}</option>}

        {error && <option>{errorText}</option>}

        {!loading && !error && monthOptions && (
          <div className="flex justify-between w-full">
            {months}
            <img
              src="/selectToggle.svg"
              alt="select-toggle"
              className="w-[22.77px] aspect-[1]"
            />
          </div>
        )}

        {isOpen && monthOptions && (
          <ul
            className={
              "w-[calc(100%+4px)] h-auto flex flex-col absolute left-[-2px] top-[100%] translate-y-[2px] border-[1px] border-black"
            }
          >
            {Object.entries(monthOptions).map(([label, value]) => (
              <li
                onClick={() => {
                  setMonths(value);
                }}
                onMouseEnter={() => {
                  setSelectElementIndex(value);
                }}
                key={value}
                className={cx(
                  "py-1 px-5 sm:px-[33.21px] bg-secondary",
                  selectElementIndex === value && "bg-[#1967d2]"
                )}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MonthSelect;
