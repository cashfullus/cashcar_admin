/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import Header from 'components/shared/Header';
import Download from 'components/modal/Download';
import MainTemplate from 'templates/MainTemplate';
import Filter from 'components/filter/Filter';
import { FilterItem, Option } from 'types/common';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import Modal from 'components/modal/Modal';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import List from 'components/list/List';
import { numberWithCommas, numberWithHyphen } from 'lib/tools';
import { ExtendedWithdraw } from 'lib/modules/point-withdraw';
import useWithdraw from 'hooks/point/useWithdraw';
import routes from 'routes/index';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import useToastify from 'hooks/useToastify';
import usePostWithdraw from 'hooks/point/usePostWithdraw';
import { withdrawStatusMapper } from 'lib/mapper';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

const WITHDRAW_REGISTER_TIME_COLUMN = '7rem';
const WITHDRAW_CHANGE_DONE_COLUMN = '7rem';
const WITHDRAW_BANK_COLUMN = '7.5rem';
const WITHDRAW_ACCOUNT_NUMBER_COLUMN = '10rem';
const WITHDRAW_NAME_COLUMN = '6rem';
const WITHDRAW_CONTACT_COLUMN = '7.5rem';
const WITHDRAW_AMOUNT_COLUMN = '6rem';
const WITHDRAW_EMAIL_COLUMN = '1fr';
const WITHDRAW_STATUS_COLUMN = '4.5rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '은행', value: 1 },
  { label: '계좌', value: 2 },
  { label: '이름', value: 3 },
];

const filterItems: FilterItem[] = [
  {
    name: 'status',
    label: '상태',
    filters: [
      { label: '출금신청', value: 0 },
      { label: '진행중', value: 1 },
      { label: '출금완료', value: 2 },
      { label: '출금취소', value: 3 },
    ],
  },
  {
    name: 'point',
    label: '출금포인트',
    filters: [
      { label: '10,000 이하', value: '0' },
      { label: '10,000 - 15,000', value: '15000' },
      { label: '15,000 - 30,000', value: '30000' },
      { label: '30,000 ~ 45,000', value: '45000' },
      { label: '45,000 이상', value: '45001' },
    ],
  },
  {
    name: 'register',
    label: '신청일',
    date: true,
  },
  {
    name: 'withdraw',
    label: '출금일',
    date: true,
  },
];

const headerItems: ListColumn<ExtendedWithdraw>[] = [
  {
    headerLabel: '신청일',
    label: 'register_time',
    column: WITHDRAW_REGISTER_TIME_COLUMN,
  },
  {
    headerLabel: '출금일',
    label: 'change_done',
    column: WITHDRAW_CHANGE_DONE_COLUMN,
  },
  {
    headerLabel: '은행',
    label: 'account_bank',
    column: WITHDRAW_BANK_COLUMN,
  },
  {
    headerLabel: '계좌',
    label: 'account_number',
    column: WITHDRAW_ACCOUNT_NUMBER_COLUMN,
  },
  {
    headerLabel: '본명',
    label: 'name',
    column: WITHDRAW_NAME_COLUMN,
  },
  {
    headerLabel: '이메일',
    label: { key: 'email' },
    column: WITHDRAW_EMAIL_COLUMN,
  },
  {
    headerLabel: '연락처',
    label: { key: 'call_number', mapper: numberWithHyphen },
    column: WITHDRAW_CONTACT_COLUMN,
  },
  {
    headerLabel: '출금포인트',
    label: { key: 'amount', mapper: numberWithCommas },
    column: WITHDRAW_AMOUNT_COLUMN,
  },
  {
    headerLabel: '상태',
    label: { key: 'status', mapper: withdrawStatusMapper },
    column: WITHDRAW_STATUS_COLUMN,
  },
];

const downloadItems: ListColumn<ExtendedWithdraw>[] = [...headerItems];

const PointWithdrawPage = () => {
  const { items, itemCount, selected, loading, getWithdrawList, toggleWithdraw, selectWithdrawList, deselectWithdrawList } =
    useWithdraw();
  const { postWithdrawList } = usePostWithdraw();
  useToastify('getWithdrawList');
  useToastify('postWithdrawList');
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.pointWithdraw,
    pageSizeChangeCallback: getWithdrawList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectWithdrawList,
    onSelect: selectWithdrawList,
  });
  const onReject = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postWithdrawList({ status: 'reject', withdrawal_list: selected });
    }
  }, [selected]);
  const onConfirm = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postWithdrawList({ status: 'confirm', withdrawal_list: selected });
    }
  }, [selected]);
  const onDone = useCallback(() => {
    if (selected.length === 0) {
      return alert('유저를 선택해주세요.');
    } else {
      return postWithdrawList({ status: 'done', withdrawal_list: selected });
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
        text: '출금완료',
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
        <title>포인트 출금하기</title>
      </Helmet>
      <Header hideActionButton onDowloadButtonClick={onDownloadButtonClick} downloadFilename='포인트출금목록'
        data={downloadTarget.map(item => ({
          "출금번호": item.id,
          "사용자번호": item.user_id,
          "예금주": item.name,
          "은행": item.account_bank,
          "계좌번호": item.account_number,
          "이메일": item.email,
          "연락처": item.call_number,
          "출금포인트": item.amount,
          "출금신청일": item.register_time,
          "출금승인일": item.change_done,
          "상태": withdrawStatusMapper(item.status).label,
        }))} />
      <Filter filterItems={filterItems} options={options} target="pointWithdraw" onSubmit={data => console.log(data)} />
      <AlignButtonRow buttons={buttons} style={{ marginTop: '1rem' }} />
      <List
        selected={selected}
        loading={loading}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        onCheckboxClick={data => toggleWithdraw(data.id)}
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
          <Download downloadItems={downloadItems} items={downloadTarget} filename="point-withdraw-list" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default PointWithdrawPage;
