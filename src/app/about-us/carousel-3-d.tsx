import Loyalty from "@/assets/icons/loyalty";
import Responsibility from "@/assets/icons/responsibility";
import Transparency from "@/assets/icons/transparency";
import cx from "@/libs/cx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  items: ValueOption[];
}

const duration = 1;

const Carousel3D = ({ items }: Props) => {
  const [indexItemCenter, setIndexItemCenter] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [captureItems, setCaptureItems] = useState(items);
  const [animationDuration, setAnimationDuration] = useState(1.5);
  const [disabled, setDisabled] = useState(false);

  interface IconItem {
    name: string;
    className: string;
    icon: (props: React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
  }

  const icons: Record<string, IconItem> = {
    transparency: {
      name: "transparency",
      className: "w-[21ch] sm:w-[35ch]",
      icon: ({ className }) => <Transparency className={className} />,
    },
    loyalty: {
      name: "loyalty",
      className: "w-[18ch] sm:w-[25ch]",
      icon: ({ className }) => <Loyalty className={className} />,
    },
    responsibility: {
      name: "responsibility",
      className: "w-[21ch] sm:w-[34ch]",
      icon: ({ className }) => <Responsibility className={className} />,
    },
  };

  const normalizedTitleLeft = captureItems?.[2]?.name?.toLowerCase();
  const IconComponentLeft = icons?.[normalizedTitleLeft]?.icon;
  const normalizedTitleRight = captureItems?.[0]?.name?.toLowerCase();
  const IconComponentRight = icons?.[normalizedTitleRight]?.icon;

  const handleReorderItemsRight = () => {
    setCaptureItems((prevItems) => {
      const newItems = [...prevItems];
      const lastItem = newItems.pop();
      if (lastItem !== undefined) {
        newItems.unshift(lastItem);
      }
      return newItems;
    });
  };

  const handleReorderItemsLeft = () => {
    setCaptureItems((prevItems) => {
      const newItems = [...prevItems];
      const lastItem = newItems.shift();
      if (lastItem !== undefined) {
        newItems.push(lastItem);
      }
      return newItems;
    });
  };

  useEffect(() => {
    setCaptureItems(items);
  }, [items]);
  return (
    <div className="flex items-center justify-center my-[50px] sm:my-[58px] relative">
      <div className="absolute top-[109.25%] flex gap-4 place-self-center z-[10]">
        <button
          className="sm:p-2 bg-primary bg-opacity-[19%] hover:bg-opacity-100 duration-300 p-1 rounded-full"
          onClick={() => {
            if (disabled) {
              return;
            }
            setAnimationDuration(duration);
            setTranslateX((prev) => prev - 100);
            setIndexItemCenter((prev) => prev + 1);
            setDisabled(true);
            setTimeout(() => {
              handleReorderItemsLeft();
              setTranslateX((prev) => prev + 100);
              setAnimationDuration(0);
              setIndexItemCenter(1);
              setDisabled(false);
            }, duration * 1000);
          }}
        >
          <img
            src="/direction-right.svg"
            className="sm:w-6 w-[13.2px] h-[13.2px] sm:h-6 rotate-180"
          />
        </button>
        <button
          className="sm:p-2 bg-primary bg-opacity-[19%] hover:bg-opacity-100 duration-300 p-1 rounded-full"
          onClick={() => {
            if (disabled) {
              return;
            }
            setAnimationDuration(duration);
            setTranslateX((prev) => prev + 100);
            setIndexItemCenter((prev) => prev - 1);
            setDisabled(true);
            setTimeout(() => {
              handleReorderItemsRight();
              setTranslateX((prev) => prev - 100);
              setAnimationDuration(0);
              setIndexItemCenter(1);
              setDisabled(false);
            }, duration * 1000);
          }}
        >
          <img
            src="/direction-right.svg"
            className="sm:w-6 w-[13.2px] h-[13.2px] sm:h-6"
          />
        </button>
      </div>
      {captureItems && (
        <>
          {/* left */}
          <motion.div
            style={{ perspective: "750px" }}
            initial={{ transform: "translateX(0)", opacity: 0 }}
            animate={{
              transform: `translateX(${translateX}%)`,
              opacity: translateX > 0 && disabled ? 1 : 0,
            }}
            transition={{
              duration: animationDuration,
              ease: "easeInOut",
            }}
            className="absolute right-[100%]"
          >
            <div
              style={{
                transform: "translateZ(100px) rotateY(35deg)",
              }}
              className="shadow-[24px_30px_51px_0px_#0000001A] sm:w-[388px] w-[219px] h-[208px] sm:h-[336px] rounded-[16px] flex flex-col items-center text-center bg-white text-[#6A6A6A]"
            >
              <div
                className={cx(
                  "flex flex-col gap-2.5 sm:gap-6 self-center",
                  icons?.[normalizedTitleLeft]?.className
                )}
              >
                {captureItems && (
                  <IconComponentLeft className="sm:w-[58px] w-[32.72px] h-[32.72px] sm:h-[58px] self-center sm:mt-[59px] mt-[33.67px] text-primary" />
                )}
                <h3
                  className={cx(
                    "font-bold text-[16px] leading-[17.59px] sm:text-[28px] sm:leading-[32px] self-center sm:mt-2 text-[#3C3C3C]"
                  )}
                >
                  {captureItems?.[2]?.title}
                </h3>
                <p className="text-[13.5px] leading-[15px] sm:text-base font-normal">
                  {captureItems?.[2]?.description}
                </p>
              </div>
            </div>
          </motion.div>
          {/* right */}
          <motion.div
            style={{ perspective: "750px" }}
            initial={{ transform: "translateX(0)", opacity: 0 }}
            animate={{
              transform: `translateX(${translateX}%)`,
              opacity: translateX < 0 && disabled ? 1 : 0,
            }}
            transition={{
              duration: animationDuration,
              ease: "easeInOut",
            }}
            className="absolute left-[100%]"
          >
            <div
              style={{
                transform: "translateZ(100px) rotateY(-35deg)",
              }}
              className="shadow-[24px_30px_51px_0px_#0000001A] sm:w-[388px] w-[219px] h-[208px] sm:h-[336px] rounded-[16px] flex flex-col items-center text-center bg-white text-[#6A6A6A]"
            >
              <div
                className={cx(
                  "flex flex-col gap-2.5 sm:gap-6 self-center",
                  icons?.[normalizedTitleRight]?.className
                )}
              >
                {captureItems && (
                  <IconComponentRight className="sm:w-[58px] w-[32.72px] h-[32.72px] sm:h-[58px] sm:mt-[59px] mt-[33.67px] self-center text-primary" />
                )}
                <h3
                  className={cx(
                    "font-bold text-[16px] leading-[17.59px] sm:text-[28px] sm:leading-[32px] self-center sm:mt-2 text-[#3C3C3C]"
                  )}
                >
                  {captureItems?.[0]?.title}
                </h3>
                <p className="text-[13.5px] leading-[15px] font-normal sm:text-base">
                  {captureItems?.[0]?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {captureItems &&
        captureItems.map((item, i) => {
          const translateZ = i === indexItemCenter ? 0 : 100;
          let rotateY;
          if (i === indexItemCenter) {
            rotateY = 0;
          }
          if (i === indexItemCenter + 1) {
            rotateY = -35;
          }
          if (i === indexItemCenter - 1) {
            rotateY = 35;
          }

          let align;
          let self;
          if (i === 1) {
            align = "text-center";
            self = "self-center";
          } else if (i === 2) {
            align = "text-center";
            self = "self-center";
          } else if (i === 0) {
            align = "text-center";
            self = "self-center";
          } else {
            align = "text-center";
            self = "self-center";
          }
          const normalizedTitle = item?.name?.toLowerCase();
          const IconComponent = icons[normalizedTitle]?.icon;
          return (
            <motion.div
              key={i}
              style={{ perspective: "750px" }}
              initial={{
                transform: "translateX(0)",
                opacity: 1,
              }}
              animate={{
                transform: `translateX(${translateX}%)`,
                opacity:
                  (translateX === 100 && i === 2) ||
                  (translateX === -100 && i === 0)
                    ? 0
                    : 1,
              }}
              transition={{
                duration: animationDuration,
                ease: "easeInOut",
              }}
            >
              <motion.div
                initial={{
                  transform: `translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                }}
                animate={{
                  transform: `translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                }}
                transition={{
                  duration: animationDuration,
                  ease: "easeInOut",
                }}
                style={{ transition: `all ${animationDuration}s ease-in-out` }}
                className={cx(
                  `shadow-[24px_30px_51px_0px_#0000001A] sm:w-[388px] w-[219px] h-[208px] sm:h-[336px] rounded-[16px] flex flex-col items-center relative`,
                  i === indexItemCenter
                    ? "bg-primary text-secondary"
                    : "bg-white text-[#6A6A6A]",
                  align
                )}
              >
                <div
                  className={cx(
                    "flex flex-col gap-2.5 sm:gap-6 self-center",
                    icons?.[normalizedTitle]?.className
                  )}
                >
                  {captureItems && (
                    <IconComponent
                      className={cx(
                        "sm:w-[58px] w-[32.72px] h-[32.72px] sm:h-[58px] sm:mt-[59px] mt-[33.67px]",
                        self,
                        i === indexItemCenter
                          ? "text-secondary"
                          : "text-primary"
                      )}
                    />
                  )}
                  <h3
                    className={cx(
                      "font-bold text-[16px] leading-[17.59px] sm:text-[28px] sm:leading-[32px] self-center sm:mt-2",
                      self,
                      i === indexItemCenter
                        ? "text-secondary"
                        : "text-[#3C3C3C]"
                    )}
                  >
                    {item?.title}
                  </h3>
                  <p className="text-[13.5px] leading-[15px] sm:text-base font-normal">
                    {item?.description}
                  </p>
                </div>

                <div className="w-[91.74px] sm:w-[164px] h-[108px] sm:h-[190px] bg-white bg-opacity-5 rounded-[20px] top-0 left-0 absolute" />
                <div className="w-[92.9px] sm:w-[164px] h-[108px] sm:h-[190px] bg-white bg-opacity-5 rounded-[43.98px] sm:rounded-[80px] bottom-5 sm:bottom-0 right-0 absolute" />
              </motion.div>
            </motion.div>
          );
        })}
    </div>
  );
};

export default Carousel3D;
