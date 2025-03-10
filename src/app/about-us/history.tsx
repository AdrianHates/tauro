import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeInFromXY } from "@/animations/animations";
import ExpandableSection from "./expandable-card";

interface Props {
  dictionary: History;
}
const History = ({ dictionary }: Props) => {
  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const img1 = "/about-us/img-1.png";
  const img2 = "/about-us/img-2.png";
  const clients = Array(4).fill(0);
  return (
    <div className="flex w-full pb-[50px] justify-center" ref={historyRef}>
      <div className="mt-[-43px] sm:mt-[-84px] mx-[20px] sm:mx-[60px] max-w-[1320px] 2xl:max-w-[1536px] w-full bg-white z-10 relative rounded-tl-[18px] sm:rounded-tl-[64px] rounded-tr-[18px] sm:rounded-tr-[64px] pt-[51px] flex flex-col xl:flex-row gap-[52px] xl:gap-0 2xl:gap-16 justify-between sm:justify-start">
        <div className="mt-0 sm:mt-[28px] flex flex-col gap-[27px]">
          <div className="mx-[17px] sm:mx-[46px] xl:max-w-[45ch] 2xl:max-w-full flex flex-col gap-0.5 text-[#707070] text-base tracking-[-0.29px] sm:tracking-[-0.43px]">
            <h3 className="title-style">{dictionary?.title}</h3>
            <p>
              <span className="font-bold">
                {dictionary?.description?.first?.first}
              </span>{" "}
              {dictionary?.description?.first?.second}
            </p>
            <p className="mt-[25px]">{dictionary?.description?.second}</p>
          </div>

          <div className="flex flex-col gap-4">
            {dictionary?.options &&
              dictionary?.options.map((opt, i) => (
                <ExpandableSection
                  key={i}
                  name={opt?.name}
                  description={opt?.description}
                />
              ))}
          </div>
        </div>

        <div className="relative max-h-[612px] flex justify-center sm:justify-start xl:mr-[47px] sm:self-center xl:self-auto ml-0 xl:ml-auto gap-[4%] sm:gap-[32.06px] sm:w-full md:w-[calc(100%-45ch-158px)] md:min-w-[709.83px]">
          {img1 && (
            <motion.img
              variants={fadeInFromXY(-200, 0, 0)}
              initial="initial"
              animate={historyInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
              src={img1}
              className="mt-auto w-[41%] sm:max-w-[287.5px] md:w-full"
            />
          )}

          {img2 && (
            <motion.img
              variants={fadeInFromXY(0, -200, 0)}
              initial="initial"
              animate={historyInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
              src={img2}
              className="w-[56.48%] sm:self-start sm:max-w-[395.44px] md:w-full"
            />
          )}
          {clients && (
            <motion.div
              variants={fadeInFromXY(0, 100, 0)}
              initial="initial"
              animate={historyInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
              className="bg-white px-3 text-center shadow-xl w-[41.91%] sm:w-[293.91px] aspect-[293.91/157.11] absolute bottom-[-4.4%] left-[23.1%] rounded-2xl flex flex-col items-center gap-[10%] sm:gap-[15.92px]"
            >
              <h6 className="font-semibold text-[6.09px] min-[400px]:text-[7px] min-[500px]:text-[9px] sm:text-[13px] leading-[9.14px] sm:leading-[19.5px] tracking-[-0.21px] sm:tracking-[-0.46px] text-primary mt-[12.5%] sm:mt-[33.55px]">
                {dictionary?.clients?.description}
              </h6>
              <div className="flex w-full items-center justify-center">
                {clients?.map((_, i) => (
                  <img
                    key={i}
                    src={`/about-us/clients/${i + 1}.png`}
                    className="w-[20%] sm:w-[54.51px] aspect-[1/1] ml-[-3%] sm:ml-[-12px] hover:scale-105 duration-300 cursor-pointer"
                  />
                ))}
                <div className="w-[20%] sm:w-[54.51px] aspect-[1/1] hover:scale-105 duration-300 cursor-pointer ml-[-3%] sm:ml-[-12px] flex items-center justify-center bg-primary rounded-full">
                  <img
                    src="/about-us/clients/plus.svg"
                    alt="plus"
                    className="w-[50%] sm:w-[25.65px] aspect-[1/1]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
