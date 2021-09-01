import React, { useCallback, useMemo, useState } from 'react';
import Header from 'components/shared/Header';
import Modal from 'components/modal/Modal';
import useModal from 'hooks/useModal';
import MainTemplate from 'templates/MainTemplate';
import useNotice from 'hooks/content/useNotice';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import { RouteComponentProps } from 'react-router';
import routes from 'routes/index';
import { ExtendedNotice } from 'lib/modules/notice';
import { ReactComponent as WriteSvg } from 'assets/write.svg';
import { ReactComponent as TrashSvg } from 'assets/trash.svg';
import PostNotice from 'components/modal/PostNotice';
import usePostNotice from 'hooks/content/usePostNotice';
import { ToastContainer } from 'react-toastify';
import useToastify from 'hooks/useToastify';
import List from 'components/list/List';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';

const NOTICE_REGISTER_TIME_COLUMN = '7rem';
const NOTICE_TITLE_COLUMN = '20rem';
const NOTICE_DESCRIPTION_COLUMN = '1fr';
const NOTICE_CHANGE_COLUMN = '10rem';

const ContentNotificationPage = ({ history }: RouteComponentProps) => {
  const headerItems: ListColumn<ExtendedNotice>[] = useMemo(
    () => [
      {
        headerLabel: '작성일',
        label: 'register_time',
        column: NOTICE_REGISTER_TIME_COLUMN,
      },
      {
        headerLabel: '제목',
        label: 'title',
        truncate: true,
        column: NOTICE_TITLE_COLUMN,
      },
      {
        headerLabel: '본문',
        label: 'description',
        truncate: true,
        html: true,
        column: NOTICE_DESCRIPTION_COLUMN,
      },
      {
        headerLabel: '변경',
        label: '',
        column: NOTICE_CHANGE_COLUMN,
        customContent: (_, data) => (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <WriteSvg onClick={() => onEdit(data)} style={{ cursor: 'pointer' }} />
              <div style={{ width: '1.5rem' }}></div>
              <TrashSvg onClick={() => onRemove(data.id)} style={{ cursor: 'pointer' }} />
            </div>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const { items, selected, itemCount, loading, toggleNotice, getNoticeList, selectNoticeList, deselectNoticeList } = useNotice();
  useToastify('getNoticeList');
  useToastify('postNotice');
  useToastify('deleteNotice');
  const { deleteNotice } = usePostNotice();
  const [editTarget, setEditTarget] = useState<ExtendedNotice>();
  const [postModal, openPostModal, closePostModal] = useModal();
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.contentNotification,
    pageSizeChangeCallback: getNoticeList,
  });
  const { headerChecked, onHeaderCheckboxClick } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectNoticeList,
    onSelect: selectNoticeList,
  });
  const onEdit = useCallback((post: ExtendedNotice) => {
    openPostModal();
    setEditTarget(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onRemove = useCallback(id => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      return deleteNotice(id);
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
      <Header actionButtonText="게시물 추가" onActionButtonClick={openPostModal} hideDownloadButton />
      <List
        loading={loading}
        selected={selected}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        headerItems={headerItems}
        items={items}
        onCheckboxClick={data => toggleNotice(data.id)}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {postModal && (
        <Modal closeOnClickOutside={false} onClose={onClosePostModal}>
          <PostNotice data={editTarget} onClose={onClosePostModal} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default ContentNotificationPage;
