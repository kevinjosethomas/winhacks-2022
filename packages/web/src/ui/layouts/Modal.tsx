import { motion } from "framer-motion";
import { useEffect, ReactNode } from "react";

type ModalProps = {
  children?: ReactNode;
  showModal: (show: boolean) => void;
};

function Modal(props: ModalProps): JSX.Element {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      onClick={() => props.showModal(false)}
      className="fixed top-0 left-0 z-50 !m-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  );
}

export default Modal;
