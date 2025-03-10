import { fadeInFromXY } from "@/animations/animations";
import cx from "@/libs/cx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  dictionary: Credits;
  id: string;
}

const Credits = ({ dictionary, id }: Props) => {
  const [creditsRef, creditsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const img1 = `${import.meta.env.BASE_URL}credits/img-1.png`;
  const img2 = `${import.meta.env.BASE_URL}credits/img-2.png`;
  return (
    <section
      className="flex justify-center bg-secondary"
      id={id}
      ref={creditsRef}
    >
      <div
        id={id}
        className="pr-[19px] sm:pr-0 pl-[19px] sm:pl-[60px] pb-[52px] flex gap-[35px] lg:flex-row flex-col-reverse 2xl:max-w-screen-2xl"
      >
        <div className="flex flex-col gap-[51px] tracking-[-0.39px] sm:tracking-[-0.43px] mt-0 sm:mt-[47px] xl:mt-[94px]">
          <h3 className="pl-0.5 title-style">{dictionary?.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
            {dictionary?.options &&
              dictionary?.options.map((opt, i) => (
                <div className="flex flex-col gap-[5px]" key={i}>
                  <div className="flex gap-2 items-center ml-0.5 lg:min-w-[60ch]">
                    <img
                      src={`${import.meta.env.BASE_URL}check.svg`}
                      alt="icon-check"
                      className="w-[16.67px] sm:w-5 h-[16.67px] sm:h-5"
                    />
                    <h6 className="font-semibold text-[18px] sm:text-[24px] leading-[27px] sm:leading-[36px] text-primary tracking-[-0.43px]">
                      {opt.name}
                    </h6>
                  </div>
                  <p className="sm:max-w-[28ch]">{opt?.description}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="relative flex self-center mt-[-26.5%] xl:mt-[-13.2%] mb-[25px] sm:mb-0 sm:max-w-[723.08px]">
          {img1 && (
            <motion.img
              variants={fadeInFromXY(0, -200, 0)}
              initial="initial"
              animate={creditsInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
              src={img1}
              alt="credits-img-1"
              className="rounded-[7.92px] w-[69.15%] object-contain"
            />
          )}
          {img2 && (
            <motion.img
              variants={fadeInFromXY(100, 0, 0)}
              initial="initial"
              animate={creditsInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
              src={img2}
              alt="credits-img-2"
              className="rounded-[7.92px] w-[47.57%] object-contain ml-[-16.55%] mt-[60%]"
            />
          )}
          <motion.div
            variants={fadeInFromXY(0, 100, 0)}
            initial="initial"
            animate={creditsInView ? "animate" : "initial"}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
            className={cx(
              "bg-white flex flex-col sm:gap-2 shadow-xl rounded-lg",
              "w-[70%] min-[475px]:w-[60%] sm:w-[294px]",
              "absolute bottom-[-2%] sm:bottom-[6%] lg:bottom-[6.3%] left-[9%] min-[475px]:left-[20%] sm:left-[27.5%] lg:left-[23.8%]",
              "py-1 lg:py-[25px] lg:pb-4 px-[13px] lg:px-[18px]",
              "min-[375px]:text-[10.5px] min-[475px]:text-[13.5px] lg:text-[12px] text-[8px] tracking-[-0.21px] lg:tracking-[-0.46px] text-center",
              "border-[0.5px] border-[#0E334B] border-opacity-[3%]"
            )}
          >
            <h6 className="font-bold leading-[16.39px] min-[475px]:leading-[21px] lg:leading-[20.87px] text-[#00263E] lg:text-[14px]">
              {dictionary?.notes?.title}
            </h6>
            <div className="flex gap-1">
              <img
                src={`${import.meta.env.BASE_URL}arrow.svg`}
                alt="arrow"
                className="w-3 lg:w-4 h-3 lg:h-4"
              />
              <p className="text-start min-[375px]:leading-[13.5px] min-[475px]:leading-[18px] leading-[11px] font-normal">
                {dictionary?.notes?.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Credits;
