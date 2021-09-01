import { useCallback } from 'react';
import useModal from './useModal';

interface UseDownloadModalParams {
  selected: (string | number)[];
}

const useDownloadModal = ({ selected }: UseDownloadModalParams) => {
  const [downloadModal, openDownloadModal, closeDownloadModal] = useModal();
  const onDownloadButtonClick = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택하세요.');
    } else {
      return openDownloadModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  return { downloadModal, closeDownloadModal, onDownloadButtonClick };
};

export default useDownloadModal;
