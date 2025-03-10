import Plus from "@/assets/icons/plus";
import useToggle from "@/hooks/useToggle";
import cx from "@/libs/cx";

interface ExpandableSectionProps {
  name: string;
  description: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  name,
  description,
}) => {
  const { isOpen, onToggle } = useToggle();

  return (
    <div className="flex flex-col sm:ml-9 sm:mr-2">
      <div
        className={cx(
          "flex justify-between rounded-[12px] pl-[19px] pr-[32px] shadow-md h-[52px] items-center text-[#707070] font-semibold text-base sm:text-[20px] sm:leading-[30px]",
          isOpen && "text-primary bg-primary bg-opacity-[6%]"
        )}
      >
        <p>{name}</p>
        <Plus className="w-5 h-5 cursor-pointer" onClick={onToggle} />
      </div>
      <p
        style={
          {
            height: isOpen ? "auto" : "0px",
            interpolateSize: "allow-keywords",
          } as React.CSSProperties
        }
        className={cx(
          "interpolate pl-[19px] pr-[32px] overflow-hidden text-base text-primary tracking-[0.43px] font-normal transition-all duration-300",
          isOpen && "py-4"
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default ExpandableSection;
