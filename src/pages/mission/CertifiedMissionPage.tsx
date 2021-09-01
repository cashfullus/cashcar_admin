import React from 'react';
import Filter from 'components/filter/Filter';
import { Spacer } from 'components/shared/Header';
import MainTemplate from 'templates/MainTemplate';
import { FilterItem, Option } from 'types/common';
import List from 'components/list/List';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import { numberWithHyphen } from 'lib/tools';
import { ExtendedCertified } from 'lib/modules/certified-mission';
import useCertified from 'hooks/mission/useCertified';
import { RouteComponentProps } from 'react-router';
import routes from 'routes/index';
import { Helmet } from 'react-helmet-async';
import useToastify from 'hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import { ListColumn } from 'hooks/list/useColumn';
import { missionStatusMapper } from 'lib/mapper';
import useToggle from 'hooks/useToggle';

const CERTIFIED_APPLIED_AT_COLUMN = '5.75rem';
const CERTIFIED_PERIOD_COLUMN = '5.75rem';
const CERTIFIED_TITLE_COLUMN = '1fr';
const CERTIFIED_MISSION_NAME_COLUMN = '1fr';
const CERTIFIED_CAR_NUMBER_COLUMN = '1fr';
const CERTIFIED_NAME_COLUMN = '4.5rem';
const CERTIFIED_CONTACT_COLUMN = '6.5rem';
const CERTIFIED_STATUS_COLUMN = '2.5rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '광고명', value: 1 },
  { label: '미션명', value: 2 },
  { label: '본명', value: 3 },
  { label: '연락처', value: 4 },
];

const filterItems: FilterItem[] = [
  {
    name: 'status',
    label: '상태',
    filters: [
      { label: '승인', value: '0' },
      { label: '대기', value: '1' },
      { label: '실패', value: '2' },
    ],
  },
];

const headerItems: ListColumn<ExtendedCertified>[] = [
  {
    headerLabel: '신청일',
    label: 'register_time',
    column: CERTIFIED_APPLIED_AT_COLUMN,
  },
  {
    headerLabel: '인증기한',
    label: 'mission_end_date',
    column: CERTIFIED_PERIOD_COLUMN,
  },
  {
    headerLabel: '광고명',
    label: 'title',
    column: CERTIFIED_TITLE_COLUMN,
  },
  {
    headerLabel: '미션명',
    label: 'mission_name',
    column: CERTIFIED_MISSION_NAME_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '차량 번호',
    label: 'car_number',
    column: CERTIFIED_CAR_NUMBER_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '본명',
    label: 'name',
    column: CERTIFIED_NAME_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '연락처',
    label: { key: 'call_number', mapper: numberWithHyphen },
    column: CERTIFIED_CONTACT_COLUMN,
  },
  { headerLabel: '상태', label: { key: 'status', mapper: missionStatusMapper }, column: CERTIFIED_STATUS_COLUMN },
];

const CertifiedMissionPage = ({ history }: RouteComponentProps) => {
  const { items, itemCount, selected, toggleCertified, getCertifiedList, selectCertifiedList, deselectCertifiedList, loading } =
    useCertified();
  useToastify('getCertifiedList');
  useToastify('getAllMissionList');
  useToastify('postMissionApply');
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.certified,
    pageSizeChangeCallback: getCertifiedList,
  });
  const { headerChecked, onHeaderCheckboxClick } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectCertifiedList,
    onSelect: selectCertifiedList,
  });
  return (
    <MainTemplate>
      <Helmet>
        <title>미션 인증 관리</title>
      </Helmet>
      <Spacer />
      <Filter filterItems={filterItems} options={options} target="certified" onSubmit={data => console.log(data)} />
      <List
        loading={loading}
        onCheckboxClick={data => toggleCertified(data.id)}
        selected={selected}
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
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default CertifiedMissionPage;
