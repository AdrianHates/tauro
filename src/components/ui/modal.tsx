import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose } : Props) => {
  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 grid h-full max-h-[100vh] w-full place-items-center overflow-y-auto bg-black bg-opacity-80 z-[9999]">
      <div className="fixed top-0 right-0 left-0 bottom-0 z-[-1] h-full max-h-[100vh] w-full"
        onClick={onClose}
      />
      {children}
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;