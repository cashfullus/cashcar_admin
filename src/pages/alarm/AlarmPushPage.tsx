import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from 'components/shared/Pagination';
import useModal from 'hooks/useModal';
import usePagination from 'hooks/usePagination';
import routes from 'routes/index';
import MainTemplate from 'templates/MainTemplate';
import Header from 'components/shared/Header';
import { FilterItem, Option } from 'types/common';
import Filter from 'components/filter/Filter';
import Modal from 'components/modal/Modal';
import PushAlarm from 'components/modal/PushAlarm';
import useAppPush from 'hooks/alarm/useAppPush';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ExtendedAppPush } from 'lib/modules/push';
import { pushIdMapper } from 'lib/mapper';
import { ToastContainer } from 'react-toastify';
import useToastify from 'hooks/useToastify';
import AppPushUserList from 'components/modal/AppPushUserList';
import { ListColumn } from 'hooks/list/useColumn';
import { ReactComponent as ChevronSvg } from 'assets/chevron-horizontal.svg';
import List from 'components/list/List';
import Download from 'components/modal/Download';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';
import MarketingUserList from 'components/modal/MarketingUserList';
import useAppPushUser from 'hooks/alarm/useAppPushUser';
import alarmAPI from 'lib/apis/alarm';

const PUSH_SEND_NUMBER_COLUMN = '5rem';
const PUSH_REGISTER_TIME_COLUMN = '5.75rem';
const PUSH_TITLE_COLUMN = '1fr';
const PUSH_BODY_COLUMN = '1fr';
const PUSH_STATUS_COLUMN = '6rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '발송번호', value: 1 },
  { label: '알림이름', value: 2 },
  { label: '내용', value: 3 },
  { label: '수신인', value: 4 },
];

const filterItems: FilterItem[] = [
  {
    name: 'period',
    label: '발송 일자',
    date: true,
  },
];

const AlarmPushPage = ({ history }: RouteComponentProps) => {
  const [allUserLoading, setAllUserLoading] = useState(false);
  const [allUserIds, setAllUserIds] = useState<number[]>([]);
  const headerItems: ListColumn<ExtendedAppPush>[] = useMemo(
    () => [
      { headerLabel: '발송번호', label: { key: 'id', mapper: pushIdMapper }, column: PUSH_SEND_NUMBER_COLUMN },
      {
        headerLabel: '발송일자',
        label: 'register_time',
        column: PUSH_REGISTER_TIME_COLUMN,
      },
      { headerLabel: '알림이름', label: 'notification_title', column: PUSH_TITLE_COLUMN },
      { headerLabel: '내용', label: 'notification_body', column: PUSH_BODY_COLUMN },
      {
        headerLabel: '전송상태',
        label: { key: ['success_count', 'transfer_count'], divider: '/' },
        column: PUSH_STATUS_COLUMN,
        customContent: (label, data) => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '1rem' }}>
            <span>{label}</span>
            <ChevronSvg onClick={() => onOpenUserListModal(data.id)} style={{ cursor: 'pointer' }} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const downloadItems: ListColumn<ExtendedAppPush>[] = [...headerItems];
  const { items, itemCount, getAppPushList, selected, selectedAppPushList, deselectedAppPushList, toggleAppPush, loading } =
    useAppPush();
  useToastify('getAppPushList');
  useToastify('sendAppPush');
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const [userListModal, openUserListModal, closeUserListModal] = useModal();
  const [marketingUserListModal, openMarketingUserListModal, closeMarketingUserListModal] = useModal();
  const pushUserTools = useAppPushUser();
  const [pushModal, openPushModal, closePushModal] = useModal();
  const [currentAppPushId, setCurrentAppPushId] = useState<number>();
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.alarmPush,
    pageSizeChangeCallback: getAppPushList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectedAppPushList,
    onSelect: selectedAppPushList,
  });
  const onCloseUserListModal = () => {
    setCurrentAppPushId(undefined);
    closeUserListModal();
  };
  const onOpenUserListModal = useCallback((id: number) => {
    setCurrentAppPushId(id);
    openUserListModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPlusCircleClick = useCallback(() => {
    pushUserTools.clearPushUserList();
    openMarketingUserListModal();
  }, []);
  const getAllUserIds = async () => {
    setAllUserLoading(true);
    const data = await alarmAPI.getMarketingUserList({page:1, count: 100000});
    const userIds = data.data.map(u => u.user_id);
    setAllUserIds(userIds);
    setAllUserLoading(false);
    return;
  }
  useEffect(() => {
    getAllUserIds();
  }, [])
  return (
    <MainTemplate>
      <Helmet>
        <title>Push 알림 목록</title>
      </Helmet>
      <Header
        actionButtonText="PUSH 알림 발송"
        onDowloadButtonClick={onDownloadButtonClick}
        onActionButtonClick={openPushModal}
      />
      <Filter filterItems={filterItems} options={options} target="push" onSubmit={data => console.log(data)} />
      <List
        headerItems={headerItems}
        items={items}
        loading={loading}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        headerChecked={headerChecked}
        onCheckboxClick={data => toggleAppPush(data.id)}
        selected={selected}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {downloadModal && (
        <Modal onClose={closeDownloadModal}>
          <Download downloadItems={downloadItems} items={downloadTarget} filename="push-list" />
        </Modal>
      )}
      {pushModal && (
        <Modal onClose={closePushModal}>
          <PushAlarm onClose={closePushModal} allUserIds={allUserIds} pushUserTools={pushUserTools} onPlusCircleClick={onPlusCircleClick} />
        </Modal>
      )}
      {userListModal && (
        <Modal onClose={onCloseUserListModal}>
          <AppPushUserList onClose={onCloseUserListModal} appPushId={currentAppPushId} />
        </Modal>
      )}
      {marketingUserListModal && (
        <Modal closeOnClickOutside={false} onClose={closeMarketingUserListModal}>
          <MarketingUserList {...pushUserTools} onClose={closeMarketingUserListModal} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default AlarmPushPage;
