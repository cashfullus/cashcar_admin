import { useCallback, useState } from "react";

const useModal = (): [boolean, () => void, () => void] => {
  const [modal, setModal] = useState(false);
  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);
  return [modal, openModal, closeModal];
};

export default useModal;
