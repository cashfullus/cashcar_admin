/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import Header from 'components/shared/Header';
import Pagination from 'components/shared/Pagination';
import Filter from 'components/filter/Filter';
import List from 'components/list/List';
import Download from 'components/modal/Download';
import Modal from 'components/modal/Modal';
import usePagination from 'hooks/usePagination';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import MainTemplate from 'templates/MainTemplate';
import { FilterItem, Option } from 'types/common';
import { numberWithCommas, numberWithHyphen } from 'lib/tools';
import { ExtendedDonate } from 'lib/modules/point-donate';
import useDonate from 'hooks/point/useDonate';
import routes from 'routes/index';
import { Helmet } from 'react-helmet-async';
import useToastify from 'hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import usePostDonate from 'hooks/point/usePostDonate';
import { donateStatusMapper } from 'lib/mapper';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

const WITHDRAW_REGISTER_TIME_COLUMN = '7rem';
const WITHDRAW_CHANGE_DONE_COLUMN = '7rem';
const WITHDRAW_ORGANIZATION_COLUMN = '1fr';
const WITHDRAW_NAME_OF_DONOR_COLUMN = '6rem';
const WITHDRAW_AMOUNT_COLUMN = '5rem';
const WITHDRAW_RECEIPT_COLUMN = '3rem';
const WITHDRAW_NAME_COLUMN = '6rem';
const WITHDRAW_CALL_NUMBER_COLUMN = '6.5rem';
const WITHDRAW_STATUS_COLUMN = '4rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '기부자명', value: 1 },
  { label: '신청자', value: 2 },
  { label: '연락처', value: 3 },
];

const filterItems: FilterItem[] = [
  {
    name: 'register',
    label: '신청일',
    date: true,
  },
  {
    name: 'donate',
    label: '기부일',
    date: true,
  },
  {
    name: 'foundation',
    label: '기부단체',
    filters: [
      { label: 'A단체', value: 0 },
      { label: 'B단체', value: 1 },
      { label: 'C단체', value: 2 },
      { label: 'D단체', value: 3 },
    ],
  },
  {
    name: 'point',
    label: '기부금액',
    filters: [
      { label: '10,000 이하', value: '0' },
      { label: '10,000 - 15,000', value: '15000' },
      { label: '15,000 - 30,000', value: '30000' },
      { label: '30,000 ~ 45,000', value: '45000' },
      { label: '45,000 이상', value: '45001' },
    ],
  },
  {
    name: 'bill',
    label: '영수증',
    filters: [
      { label: '신청', value: 0 },
      { label: '미신청', value: 1 },
    ],
  },
  {
    name: 'status',
    label: '상태',
    filters: [
      { label: '기부신청', value: 0 },
      { label: '진행중', value: 1 },
      { label: '기부완료', value: 2 },
      { label: '기부취소', value: 3 },
    ],
  },
];

const headerItems: ListColumn<ExtendedDonate>[] = [
  {
    headerLabel: '신청일',
    label: 'register_time',
    column: WITHDRAW_REGISTER_TIME_COLUMN,
  },
  {
    headerLabel: '기부일',
    label: 'change_done',
    column: WITHDRAW_CHANGE_DONE_COLUMN,
  },
  {
    headerLabel: '기부단체',
    label: 'donation_organization',
    column: WITHDRAW_ORGANIZATION_COLUMN,
  },
  {
    headerLabel: '기부자명',
    label: 'name_of_donor',
    column: WITHDRAW_NAME_OF_DONOR_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '기부금액',
    label: { key: 'amount', mapper: numberWithCommas },
    column: WITHDRAW_AMOUNT_COLUMN,
  },
  {
    headerLabel: '영수증',
    label: 'receipt',
    column: WITHDRAW_RECEIPT_COLUMN,
  },
  {
    headerLabel: '신청자',
    label: 'name',
    column: WITHDRAW_NAME_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '연락처',
    label: { key: 'call_number', mapper: numberWithHyphen },
    column: WITHDRAW_CALL_NUMBER_COLUMN,
  },
  {
    headerLabel: '상태',
    label: { key: 'status', mapper: donateStatusMapper },
    column: WITHDRAW_STATUS_COLUMN,
  },
];

const downloadItems: ListColumn<ExtendedDonate>[] = [...headerItems];

const PointDonatePage = () => {
  const { items, itemCount, selected, loading, getDonateList, deselectDonateList, selectDonateList, toggleDonate } = useDonate();
  const { postDonateList } = usePostDonate();
  useToastify('getDonateList');
  useToastify('postDonateList');
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.pointDonate,
    pageSizeChangeCallback: getDonateList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectDonateList,
    onSelect: selectDonateList,
  });
  const onReject = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postDonateList({ status: 'reject', withdrawal_donate_list: selected });
    }
  }, [selected]);
  const onConfirm = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postDonateList({ status: 'confirm', withdrawal_donate_list: selected });
    }
  }, [selected]);
  const onDone = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postDonateList({ status: 'done', withdrawal_donate_list: selected });
    }
  }, [selected]);
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '취소',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        noFill: true,
        fullRounded: true,
        onClick: onReject,
      },
      {
        text: '진행중',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        fullRounded: true,
        onClick: onConfirm,
      },
      {
        text: '기부완료',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        fullRounded: true,
        onClick: onDone,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onReject, onConfirm, onDone],
  );
  return (
    <MainTemplate>
      <Helmet>
        <title>포인트 기부하기</title>
      </Helmet>
      <Header hideActionButton onDowloadButtonClick={onDownloadButtonClick} />
      <Filter filterItems={filterItems} options={options} target="pointDonate" onSubmit={data => console.log(data)} />
      <AlignButtonRow buttons={buttons} style={{ marginTop: '1rem' }} />
      <List
        loading={loading}
        selected={selected}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        onCheckboxClick={data => toggleDonate(data.id)}
        headerItems={headerItems}
        items={items}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {downloadModal && (
        <Modal onClose={closeDownloadModal}>
          <Download downloadItems={downloadItems} items={downloadTarget} filename="point-donate-list" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default PointDonatePage;
