import React, { useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import MainTemplate from 'templates/MainTemplate';
import Header from 'components/shared/Header';
import Filter from 'components/filter/Filter';
import Pagination from 'components/shared/Pagination';
import List from 'components/list/List';
import { adStatusMapper, genderMapper } from 'lib/mapper';
import usePagination from 'hooks/usePagination';
import { FilterItem, Option } from 'types/common';
import { RouteComponentProps } from 'react-router';
import routes, { CREATE_AD_URL } from 'routes/index';
import Download from 'components/modal/Download';
import Modal from 'components/modal/Modal';
import { numberWithCommas } from 'lib/tools';
import { ExtendedAD } from 'lib/modules/ad';
import useAD from 'hooks/ad/useAD';
import { Helmet } from 'react-helmet-async';
import useToastify from 'hooks/useToastify';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';

const AD_NUMBER_COLUMN = '5rem';
const AD_RECRUITMENT_PERIOD_COLUMN = '5.75rem';
const AD_NAME_COLUMN = '1fr';
const AD_ADVERTISER_COLUMN = '6.5rem';
const AD_STATUS_COLUMN = '4rem';
const AD_POINT_COLUMN = '5rem';
const AD_ACTIVITY_PERIOD_COLUMN = '5rem';
const AD_RECRUITMENT_NUMBER_COLUMN = '5rem';
const AD_LOCATION_COLUMN = '7rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '광고명', value: 1 },
  { label: '광고번호', value: 2 },
  { label: '광고주', value: 3 },
];

const filterItems: FilterItem[] = [
  {
    name: 'category',
    label: '상태',
    filters: [
      { label: '예정', value: 'scheduled' },
      { label: '모집중', value: 'ongoing' },
      { label: '종료', value: 'done' },
    ],
  },
  {
    name: 'point',
    label: '포인트',
    range: true,
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
  // {
  //   name: "age",
  //   label: "나이",
  //   filters: [
  //     { label: "10대", value: 10 },
  //     { label: "20대", value: 20 },
  //     { label: "30대", value: 30 },
  //     { label: "40대", value: 40 },
  //     { label: "50대", value: 50 },
  //     { label: "60대 이상", value: 60 },
  //   ],
  // },
  {
    name: 'distance',
    label: '최소거리',
    filters: [
      { label: '50KM 이상', value: 50 },
      { label: '100KM 이상', value: 100 },
      { label: '200KM 이상', value: 200 },
      { label: '300KM 이상', value: 300 },
    ],
  },
  {
    name: 'recruit_time',
    label: '모집기간',
    date: true,
  },
];

const headerItems: ListColumn<ExtendedAD>[] = [
  { headerLabel: '광고번호', label: 'id', column: AD_NUMBER_COLUMN },
  {
    headerLabel: '모집기간',
    label: {
      key: ['recruit_start_date', 'recruit_end_date'],
      divider: '- ',
    },
    column: AD_RECRUITMENT_PERIOD_COLUMN,
  },
  { headerLabel: '광고명', label: 'title', column: AD_NAME_COLUMN },
  { headerLabel: '광고주', label: 'owner_name', column: AD_ADVERTISER_COLUMN },
  {
    headerLabel: '상태',
    label: { key: 'ad_status', mapper: adStatusMapper },
    column: AD_STATUS_COLUMN,
  },
  {
    headerLabel: '포인트',
    label: { key: 'total_point', mapper: numberWithCommas },
    column: AD_POINT_COLUMN,
  },
  {
    headerLabel: '활동기간',
    label: 'activity_period',
    column: AD_ACTIVITY_PERIOD_COLUMN,
  },
  {
    headerLabel: '모집인원',
    label: {
      key: ['recruiting_count', 'max_recruiting_count'],
      divider: '/',
    },
    column: AD_RECRUITMENT_NUMBER_COLUMN,
  },
  {
    headerLabel: '지역',
    label: 'area',
    column: AD_LOCATION_COLUMN,
    truncate: true,
  },
];

const downloadItems: ListColumn<ExtendedAD>[] = [
  ...headerItems,
  { headerLabel: '최소거리', label: 'min_distance', column: '' },
  { headerLabel: '성별', label: { key: 'gender', mapper: genderMapper }, column: '' },
  { headerLabel: '연령', label: { key: ['min_age_group', 'max_age_group'], divider: '~' }, column: '' },
  { headerLabel: '광고설명', label: 'description', column: '' },
];

const AdListPage = ({ history }: RouteComponentProps) => {
  const { getADList, selectADList, deselectADList, toggleAD, items, itemCount, selected, loading } = useAD();
  useToastify('getADList');
  useToastify('postAD');
  useToastify('getADUserList');
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.adList,
    pageSizeChangeCallback: getADList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectADList,
    onSelect: selectADList,
  });
  const onActionButtonClick = useCallback(() => history.push(CREATE_AD_URL), [history]);
  const onFilterSubmit = useCallback(
    (data: any) => {
      console.log(data);
      history.push({ pathname: routes.adList, search: `?page=1` });
      getADList({ page: 1, count: pageSize, ...data });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getADList, pageSize],
  );
  return (
    <MainTemplate>
      <Helmet>
        <title>광고 목록</title>
      </Helmet>
      <Header
        actionButtonText="광고 추가"
        onDowloadButtonClick={onDownloadButtonClick}
        onActionButtonClick={onActionButtonClick}
      />
      <Filter filterItems={filterItems} options={options} target="adList" onSubmit={onFilterSubmit} />
      <List
        onCheckboxClick={data => toggleAD(data.id)}
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
          <Download downloadItems={downloadItems} items={downloadTarget} filename="ad-list" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default AdListPage;
