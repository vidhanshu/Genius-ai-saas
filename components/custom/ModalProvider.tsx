"use client";

import useMounted from "@/hooks/useMounted";
import ProModal from "@/components/custom/ProModal";

const ModalProvider = () => {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
