import React, { useCallback, useMemo } from 'react';
import Filter from 'components/filter/Filter';
import MainTemplate from 'templates/MainTemplate';
import { FilterItem, Option } from 'types/common';
import Header from 'components/shared/Header';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import { adApplyStatusMapper } from 'lib/mapper';
import { ExtendedADApply } from 'lib/modules/ad-apply';
import { numberWithHyphen } from 'lib/tools';
import { RouteComponentProps } from 'react-router';
import routes from 'routes/index';
import useADApply from 'hooks/ad/useADApply';
import usePostADApply from 'hooks/ad/usePostADApply';
import { Helmet } from 'react-helmet-async';
import useToastify from 'hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import { ListColumn } from 'hooks/list/useColumn';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';
import List from 'components/list/List';
import Modal from 'components/modal/Modal';
import Download from 'components/modal/Download';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';

const AD_APPLY_APPLIED_AT_COLUMN = '5.75rem';
const AD_APPLY_CONFIRMED_AT_COLUMN = '5.75rem';
const AD_APPLY_TITLE_COLUMN = '1fr';
const AD_APPLY_EMAIL_COLUMN = '1fr';
const AD_APPLY_NAME_COLUMN = '4.5rem';
const AD_APPLY_CONTACT_COLUMN = '6.5rem';
const AD_APPLY_ADDRESS_COLUMN = '10rem';
const AD_APPLY_NUMBER_COLUMN = '4rem';
const AD_APPLY_STATUS_COLUMN = '2.5rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '광고명', value: 'ai.title' },
  { label: '광고주', value: 'ai.owner_name' },
  { label: '본명', value: 'u.name' },
  { label: '연락처', value: 'u.call_number' },
  { label: '주소', value: 'address' },
];

const filterItems: FilterItem[] = [
  {
    name: 'status',
    label: '상태',
    filters: [
      { label: '승인', value: 'scheduled' },
      { label: '대기', value: 'waiting' },
      { label: '거절', value: 'reject' },
      { label: '종료', value: 'done' },
    ],
  },
  {
    name: 'area',
    label: '지역',
    filters: [
      { label: '전국', value: '전국' },
      { label: '서울', value: '서울' },
      { label: '경기', value: '경기' },
      { label: '인천', value: '인천' },
      { label: '부산', value: '부산' },
      { label: '울산', value: '울산' },
      { label: '대구', value: '대구' },
      { label: '세종', value: '세종' },
      { label: '대전', value: '대전' },
      { label: '광주', value: '광주' },
      { label: '충남', value: '충남' },
      { label: '충북', value: '충북' },
      { label: '경남', value: '경남' },
      { label: '경북', value: '경북' },
      { label: '전남', value: '전남' },
      { label: '전북', value: '전북' },
      { label: '강원', value: '강원' },
      { label: '제주', value: '제주' },
    ],
  },
  {
    name: 'gender',
    label: '성별',
    filters: [
      { label: '남자', value: 1 },
      { label: '여자', value: 2 },
    ],
  },
  {
    name: 'age',
    label: '나이',
    range: true,
    minPlaceholder: '최소 나이 입력',
    maxPlaceholder: '최대 나이 입력',
  },
];
const headerItems: ListColumn<ExtendedADApply>[] = [
  {
    headerLabel: '신청일',
    label: 'register_time',
    column: AD_APPLY_APPLIED_AT_COLUMN,
  },
  {
    headerLabel: '승인일',
    label: 'accept_status_time',
    column: AD_APPLY_CONFIRMED_AT_COLUMN,
  },
  {
    headerLabel: '광고명',
    label: 'title',
    column: AD_APPLY_TITLE_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '이메일',
    label: 'email',
    column: AD_APPLY_EMAIL_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '본명',
    label: 'name',
    column: AD_APPLY_NAME_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '연락처',
    label: { key: 'call_number', mapper: numberWithHyphen },
    column: AD_APPLY_CONTACT_COLUMN,
  },
  {
    headerLabel: '주소',
    label: { key: ['main_address', 'detail_address'], divider: ' ' },
    column: AD_APPLY_ADDRESS_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '모집번호',
    label: {
      key: ['recruit_number', 'max_recruiting_count'],
      divider: ' / ',
    },
    column: AD_APPLY_NUMBER_COLUMN,
  },
  {
    headerLabel: '상태',
    label: { key: 'status', mapper: adApplyStatusMapper },
    column: AD_APPLY_STATUS_COLUMN,
  },
];

const downloadItems: ListColumn<ExtendedADApply>[] = [...headerItems];

const AdApplyListPage = ({ history }: RouteComponentProps) => {
  const { items, itemCount, selected, toggleADApply, getADApplyList, selectADApplyList, deselectADApplyList } = useADApply();
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  useToastify('getADUserList');
  useToastify('postADApply');
  const { postADApply } = usePostADApply();
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.adApplyList,
    pageSizeChangeCallback: getADApplyList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectADApplyList,
    onSelect: selectADApplyList,
  });
  const onFilterSubmit = useCallback(
    (data: any) => {
      history.push({ pathname: routes.adApplyList, search: `?page=1` });
      getADApplyList({ page: 1, count: pageSize, ...data });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getADApplyList, pageSize],
  );
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '거절',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        noFill: true,
        fullRounded: true,
        onClick: () => {
          if (selected.length === 0) {
            return alert('유저를 선택하세요.');
          } else {
            return postADApply(selected, 'reject');
          }
        },
      },
      {
        text: '승인',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'submit',
        fullRounded: true,
        onClick: () => {
          if (selected.length === 0) {
            return alert('유저를 선택하세요.');
          } else {
            return postADApply(selected, 'accept');
          }
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected],
  );
  return (
    <MainTemplate>
      <Helmet>
        <title>광고 신청 회원</title>
      </Helmet>
      <Header hideActionButton onDowloadButtonClick={onDownloadButtonClick} />
      <Filter filterItems={filterItems} options={options} target="adApply" onSubmit={onFilterSubmit} />
      <AlignButtonRow marginTop="1rem" buttons={buttons} />
      <List
        onCheckboxClick={data => toggleADApply(data.id)}
        selected={selected}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        items={items}
        headerItems={headerItems}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={onPageSizeChange}
      />
      {downloadModal && (
        <Modal onClose={closeDownloadModal}>
          <Download downloadItems={downloadItems} items={downloadTarget} filename="ad-apply-list" allowDownload />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default AdApplyListPage;
