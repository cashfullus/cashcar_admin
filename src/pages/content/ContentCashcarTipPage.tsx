import React, { useCallback, useMemo, useState } from 'react';
import Header from 'components/shared/Header';
import MainTemplate from 'templates/MainTemplate';
import useModal from 'hooks/useModal';
import Modal from 'components/modal/Modal';
import PostTip from 'components/modal/PostTip';
import { RouteComponentProps } from 'react-router';
import { ExtendedCashcarTip } from 'lib/modules/tip';
import { ReactComponent as WriteSvg } from 'assets/write.svg';
import { ReactComponent as TrashSvg } from 'assets/trash.svg';
import useTip from 'hooks/content/useTip';
import useToastify from 'hooks/useToastify';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import routes from 'routes/index';
import usePostTip from 'hooks/content/usePostTip';
import { ToastContainer } from 'react-toastify';
import Loading from 'components/modal/Loading';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/modules';
import { ListColumn } from 'hooks/list/useColumn';
import List from 'components/list/List';
import useToggle from 'hooks/useToggle';

const TIP_REGISTER_TIME_COLUMN = '7rem';
const TIP_TITLE_COLUMN = '20rem';
const TIP_DESCRIPTION_COLUMN = '1fr';
const TIP_CHANGE_COLUMN = '10rem';

const ContentCashcarTipPage = ({ history }: RouteComponentProps) => {
  const headerItems: ListColumn<ExtendedCashcarTip>[] = useMemo(
    () => [
      {
        headerLabel: '작성일',
        label: 'register_time',
        column: TIP_REGISTER_TIME_COLUMN,
      },
      {
        headerLabel: '제목',
        label: 'title',
        truncate: true,
        column: TIP_TITLE_COLUMN,
      },
      {
        headerLabel: '본문',
        label: 'main_description',
        truncate: true,
        html: true,
        column: TIP_DESCRIPTION_COLUMN,
      },
      {
        headerLabel: '변경',
        label: '',
        customContent: (_, data) => (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <WriteSvg onClick={() => onEdit(data)} style={{ cursor: 'pointer' }} />
              <div style={{ width: '1.5rem' }}></div>
              <TrashSvg onClick={() => onRemove(data.id)} style={{ cursor: 'pointer' }} />
            </div>
          </>
        ),
        column: TIP_CHANGE_COLUMN,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const {
    items,
    selected,
    itemCount,
    loading,
    toggleCashcarTip,
    selectCashcarTipList,
    deselectCashcarTipList,
    getCashcarTipList,
  } = useTip();
  const postLoading = useSelector((state: RootState) => state.loading.postCashcarTip);
  const { deleteCashcarTip } = usePostTip();
  const [editTarget, setEditTarget] = useState<ExtendedCashcarTip>();
  const [postModal, openPostModal, closePostModal] = useModal();
  useToastify('getCashcarTipList');
  useToastify('deleteCashcarTip');
  useToastify('postCashcarTip');
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.contentCashcarTip,
    pageSizeChangeCallback: getCashcarTipList,
  });
  const { headerChecked, onHeaderCheckboxClick } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectCashcarTipList,
    onSelect: selectCashcarTipList,
  });
  const onEdit = useCallback((post: ExtendedCashcarTip) => {
    openPostModal();
    setEditTarget(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onRemove = useCallback(id => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      return deleteCashcarTip(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClosePostModal = useCallback(() => {
    closePostModal();
    setEditTarget(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainTemplate>
      <Header actionButtonText="게시물 추가" hideDownloadButton onActionButtonClick={openPostModal} />
      <List
        loading={loading}
        selected={selected}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        headerItems={headerItems}
        items={items}
        onCheckboxClick={data => toggleCashcarTip(data.id)}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {postModal && (
        <Modal closeOnClickOutside={false} onClose={onClosePostModal}>
          <PostTip data={editTarget} onClose={onClosePostModal} />
        </Modal>
      )}
      {postLoading && <Loading />}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default React.memo(ContentCashcarTipPage);
