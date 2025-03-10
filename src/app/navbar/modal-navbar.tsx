import { useState } from "react";
import Modal from "@/components/ui/modal";
import cx from "@/libs/cx";

interface Props {
  logo?: string;
  button?: {
    name: string;
  };
  onClick: () => void;
  options?: {
    name: string;
  }[];
  toggle?: boolean;
  setLogin: () => void;
}

const ModalNavbar = ({
  logo,
  button,
  onClick,
  options,
  setLogin,
  ...toggle
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal {...toggle}>
      <div
        className={cx(
          "modal-navbar w-full h-full bg-primary",
          "flex flex-col",
          isVisible ? "" : "fade-out"
        )}
      >
        <div className="h-[100px] py-4 flex items-center justify-center border-[#24364BCC] border-b-[.5px]">
          {logo && (
            <a href="#">
              <img alt="logo_empresa" width={100} src={logo} />
            </a>
          )}
          <button
            className="text-white absolute right-[5%] top-[2.5%] text-[24px] scale-x-[1.2]"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                onClick();
              }, 300);
            }}
          >
            X
          </button>
        </div>
        <ul className="flex flex-col text-white my-[.5rem]">
          {options &&
            options.map((opt, i) => (
              <li
                key={i}
                className="font-light text-[20px] hover:bg-quaternary hover:brightness-125 duration-300 cursor-pointer"
              >
                <a
                  href={"#" + opt.name.toLowerCase()}
                  className="flex h-full py-[1rem] px-[2rem]"
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => {
                      onClick();
                    }, 300);
                  }}
                >
                  {opt.name}
                </a>
              </li>
            ))}
        </ul>

        {button && (
          <div className="w-full h-full flex items-center justify-center">
            <button
              onClick={() => {
                setLogin();
              }}
              className="bg-secondary bg-opacity-50 hover:brightness-125 hover:scale-[1.05] text-[20px] duration-300 py-2.5 px-[22px] rounded-md font-bold text-white"
            >
              {button.name}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalNavbar;
