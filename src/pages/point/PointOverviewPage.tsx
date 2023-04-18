/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import Filter from 'components/filter/Filter';
import Header from 'components/shared/Header';
import MainTemplate from 'templates/MainTemplate';
import { FilterItem, Option } from 'types/common';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import Download from 'components/modal/Download';
import Modal from 'components/modal/Modal';
import routes from 'routes/index';
import { RouteComponentProps } from 'react-router';
import usePoint from 'hooks/point/usePoint';
import List from 'components/list/List';
import { ExtendedPoint } from 'lib/modules/point-overview';
import useModal from 'hooks/useModal';
import { numberWithCommas, numberWithHyphen } from 'lib/tools';
import PointAll from 'components/modal/PointAll';
import usePostPoint from 'hooks/point/usePostPoint';
import Loading from 'components/modal/Loading';
import useToastify from 'hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';

const POINT_NICKNAME_COLUMN = '8rem';
const POINT_NAME_COLUMN = '8rem';
const POINT_CALL_NUMBER_COLUMN = '1fr';
const POINT_EMAIL_COLUMN = '1fr';
const POINT_DEPOSIT_COLUMN = '8rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '별명', value: 1 },
  { label: '본명', value: 2 },
  { label: '연락처', value: 3 },
  { label: '이메일', value: 4 },
];

const filterItems: FilterItem[] = [
  {
    name: 'point',
    label: '포인트',
    range: true,
  },
];

const headerItems: ListColumn<ExtendedPoint>[] = [
  { headerLabel: '별명', label: 'nickname', column: POINT_NICKNAME_COLUMN },
  {
    headerLabel: '본명',
    label: 'name',
    column: POINT_NAME_COLUMN,
  },
  { headerLabel: '연락처', label: { key: 'call_number', mapper: numberWithHyphen }, column: POINT_CALL_NUMBER_COLUMN },
  { headerLabel: '이메일', label: 'email', column: POINT_EMAIL_COLUMN },
  {
    headerLabel: '보유 포인트',
    label: { key: 'deposit', mapper: numberWithCommas },
    column: POINT_DEPOSIT_COLUMN,
  },
];

const downloadItems: ListColumn<ExtendedPoint>[] = [...headerItems];

const PointOverviewPage = ({ history }: RouteComponentProps) => {
  const { items, itemCount, loading, selected, getPointList, selectPointList, deselectPointList, togglePoint } = usePoint();
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const [pointAllModal, openPointAllModal, closePointAllModal] = useModal();
  useToastify('postPointList');
  useToastify('postPoint');
  const { postAllLoading, postLoading } = usePostPoint();
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.pointOverview,
    pageSizeChangeCallback: getPointList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectPointList,
    onSelect: selectPointList,
  });
  const onActionButtonClick = useCallback(() => {
    if (selected.length === 0) {
      alert('유저를 선택해주세요.');
    } else {
      openPointAllModal();
    }
  }, [selected]);
  return (
    <MainTemplate>
      <Header
        actionButtonText="포인트 일괄"
        onDowloadButtonClick={onDownloadButtonClick}
        onActionButtonClick={onActionButtonClick}
      />
      <Filter filterItems={filterItems} options={options} target="pointOverview" onSubmit={getPointList} />
      <List
        onCheckboxClick={data => togglePoint(data.id)}
        selected={selected}
        loading={loading}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        headerItems={headerItems}
        items={items}
        useCollapse
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {downloadModal && (
        <Modal onClose={closeDownloadModal}>
          <Download downloadItems={downloadItems} items={downloadTarget} filename="point-overview-list" />
        </Modal>
      )}
      {pointAllModal && (
        <Modal onClose={closePointAllModal}>
          <PointAll onClose={closePointAllModal} />
        </Modal>
      )}
      {postAllLoading && <Loading />}
      {postLoading && <Loading />}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default PointOverviewPage;
