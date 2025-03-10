import { useEffect, useState } from "react";
import ModalNavbar from "./modal-navbar";
import useToggle from "@/hooks/useToggle";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "./index.css";
import cx from "@/libs/cx";
import { fadeInFromTop, fadeInFromXY } from "@/animations/animations";

interface Props {
  dictionary: Navbar;
  setLogin: () => void;
}

const logo = {
  normal: "logo.svg",
  scroll: "logo.svg",
};

const Navbar = ({ dictionary, setLogin }: Props) => {
  const { isOpen, onToggle, onClose } = useToggle();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const { ref: navbarRef, inView: navbarInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };
    const sections = dictionary?.options.map((opt) =>
      document.getElementById(opt.name.toLowerCase())
    );
    if (sections) {
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section?.offsetTop - 10;
          const sectionBottom = sectionTop + section.clientHeight;

          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dictionary?.options, scrollPosition]);

  return (
    <>
      <nav
        ref={navbarRef}
        style={{
          borderImageSource:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.192) 0%, rgba(255, 255, 255, 0.8) 48.98%, rgba(255, 255, 255, 0) 101.55%, rgba(255, 255, 255, 0.192) 101.55%)",
        }}
        className={cx(
          "bg-transparent backdrop-blur-sm flex justify-between items-center px-[19px] sm:px-[60px] py-[15.5px] sm:py-[18.5px] fixed top-0 z-[9999] w-full max-w-[3840px]",
          scrollPosition > 50 ? "transition-all bg-[black] bg-opacity-30" : ""
        )}
      >
        <motion.a
          href="#"
          variants={fadeInFromTop}
          initial="initial"
          animate={navbarInView ? "animate" : "initial"}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            alt="logo_empresa"
            src={`${import.meta.env.BASE_URL}${
              scrollPosition > 65 ? logo.scroll : logo.normal
            }`}
            className={cx(
              "sm:w-[159px] w-[115px] sm:h-[57px] h-[41px]",
              scrollPosition > 65 ? "" : ""
            )}
          />
        </motion.a>

        <button
          className="text-white lg:hidden block"
          onClick={() => {
            onToggle();
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}toggle.svg`}
            alt="toggle"
            className="w-6 h-6"
          />
        </button>

        <ul className="lg:flex hidden gap-[18px] items-center justify-center text-[16px] leading-[24px] text-white uppercase">
          {dictionary?.options.map((opt, i) => (
            <li
              key={i}
              className={cx(
                "hover:text-secondary hover:font-bold font-medium text-center lg:block hidden relative",
                activeSection === opt.name.toLowerCase()
                  ? "text-secondary font-bold"
                  : ""
              )}
            >
              <motion.div
                variants={fadeInFromTop}
                initial="initial"
                animate={navbarInView ? "animate" : "initial"}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <a href={"#" + opt.name.toLowerCase()}>
                  <p className="font-bold opacity-0">{opt.name}</p>
                  <p className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] w-full">
                    {opt.name}
                  </p>
                </a>
              </motion.div>
              <motion.div
                variants={fadeInFromXY(-100, 0, 0)}
                initial="initial"
                animate={navbarInView ? "animate" : "initial"}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cx(
                  "bg-quaternary fade-in-from-left h-[2px] absolute top-100 left-0",
                  activeSection === opt.name.toLowerCase() ? "w-full" : "w-0"
                )}
              />
            </li>
          ))}

          {dictionary?.button && (
            <motion.div
              variants={fadeInFromTop}
              initial="initial"
              animate={navbarInView ? "animate" : "initial"}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <button
                onClick={() => {
                  setLogin();
                }}
                className="duration-300 bg-[#0E334B] hover:brightness-125 hover:scale-[1.05] py-2.5 px-[22px] rounded-md font-medium"
              >
                {dictionary?.button.name}
              </button>
            </motion.div>
          )}
        </ul>
      </nav>
      {isOpen && (
        <ModalNavbar
          onClick={onClose}
          options={dictionary?.options}
          button={dictionary?.button}
          logo={logo.scroll}
          setLogin={setLogin}
        />
      )}
    </>
  );
};

export default Navbar;
