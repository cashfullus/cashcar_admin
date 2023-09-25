import React, { useCallback } from 'react';
import MainTemplate from 'templates/MainTemplate';
import List from 'components/list/List';
import Filter from 'components/filter/Filter';
import Header from 'components/shared/Header';
import Pagination from 'components/shared/Pagination';
import usePagination from 'hooks/usePagination';
import { FilterItem, Option } from 'types/common';
import { dateOfBirthMapper, genderMapper, koreanBirthMapper, marketingMapper, supportersMapper } from 'lib/mapper';
import Modal from 'components/modal/Modal';
import Download from 'components/modal/Download';
import { ExtendedUser } from 'lib/modules/users';
import { RouteComponentProps } from 'react-router';
import routes from 'routes/index';
import useUser from 'hooks/useUser';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import useToastify from 'hooks/useToastify';
import { numberWithCommas, numberWithHyphen } from 'lib/tools';
import { ListColumn } from 'hooks/list/useColumn';
import useToggle from 'hooks/useToggle';
import useDownloadModal from 'hooks/useDownloadModal';

const USER_NICKNAME_COLUMN = '5rem';
const USER_NAME_COLUMN = '5.75rem';
const USER_CONTACT_COLUMN = '6.5rem';
const USER_EMAIL_COLUMN = '1fr';
const USER_CAR_COLUMN = '1fr';
const USER_GENDER_COLUMN = '5rem';
const USER_AGE_COLUMN = '3rem';
const USER_CREATED_AT_COLUMN = '7rem';

const options: Option[] = [
  { label: '전체', value: 0 },
  { label: '별명', value: 1 },
  { label: '본명', value: 2 },
  { label: '연락처', value: 3 },
  { label: '이메일', value: 4 },
  { label: '등록차량', value: 5 },
];

const filterItems: FilterItem[] = [
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
  {
    name: 'register_time',
    label: '가입일',
    date: true,
  },
];

const headerItems: ListColumn<ExtendedUser>[] = [
  {
    headerLabel: '별명',
    label: 'nickname',
    column: USER_NICKNAME_COLUMN,
    truncate: true,
  },
  { headerLabel: '본명', label: 'name', column: USER_NAME_COLUMN },
  {
    headerLabel: '연락처',
    label: { key: 'call_number', mapper: numberWithHyphen },
    column: USER_CONTACT_COLUMN,
  },
  {
    headerLabel: '이메일',
    label: 'email',
    column: USER_EMAIL_COLUMN,
    truncate: true,
  },
  {
    headerLabel: '등록차량',
    label: { key: 'vehicle_information', mapper: supportersMapper },
    column: USER_CAR_COLUMN,
  },
  {
    headerLabel: '성별',
    label: { key: 'gender', mapper: genderMapper },
    column: USER_GENDER_COLUMN,
  },
  {
    headerLabel: '연령',
    label: { key: 'date_of_birth', mapper: dateOfBirthMapper },
    column: USER_AGE_COLUMN,
  },
  {
    headerLabel: '가입일',
    label: 'register_time',
    column: USER_CREATED_AT_COLUMN,
  },
];

const downloadItems: ListColumn<ExtendedUser>[] = [
  ...headerItems,
  { headerLabel: '생년월일', label: { key: 'date_of_birth', mapper: koreanBirthMapper }, column: '' },
  { headerLabel: '주소', label: { key: ['main_address', 'detail_address'], divider: ' ' }, column: '' },
  { headerLabel: '보유포인트', label: { key: 'deposit', mapper: numberWithCommas }, column: '' },
  { headerLabel: '마케팅수신', label: { key: 'marketing', mapper: marketingMapper }, column: '' },
];

const UserListPage = ({ history }: RouteComponentProps) => {
  const { items, itemCount, selected, loading, toggleUser, getUserList, selectUserList, deselectUserList } = useUser();
  useToastify('getUserList');
  const { downloadModal, closeDownloadModal, onDownloadButtonClick } = useDownloadModal({ selected });
  const { defaultPage, totalPage, pageSize, onPageChange, onPageSizeChange } = usePagination({
    itemCount,
    route: routes.userList,
    pageSizeChangeCallback: getUserList,
  });
  const { headerChecked, onHeaderCheckboxClick, downloadTarget } = useToggle({
    items,
    selected,
    pageSize,
    itemCount,
    onDeselect: deselectUserList,
    onSelect: selectUserList,
  });
  const onFilterSubmit = useCallback(
    (data: any) => {
      history.push({ pathname: routes.userList, search: `?page=1` });
      getUserList({ page: 1, count: pageSize, ...data });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getUserList, pageSize],
  );
  return (
    <MainTemplate>
      <Helmet>
        <title>전체 회원</title>
      </Helmet>
      <Header hideActionButton onDowloadButtonClick={onDownloadButtonClick} downloadFilename='사용자목록'
        data={downloadTarget.map(item => ({
          "사용자번호": item.id,
          "이름": item.name,
          "별명": item.nickname,
          "연락처": item.call_number,
          "이메일": item.email,
          "생년월일": item.date_of_birth,
          "주소": item.main_address + " " + item.detail_address,
          "보유포인트": item.deposit,
          "보유차량": item.vehicle_information.map(v => `${v.brand}_${v.vehicle_model_name}_${v.car_number}_${v.owner_relationship}`).join(" :: "),
          "가입일": item.register_time,
        }))} />
      <Filter filterItems={filterItems} options={options} target="allUsers" onSubmit={onFilterSubmit} />
      <List
        loading={loading}
        onCheckboxClick={data => toggleUser(data.id)}
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
      {downloadModal && (
        <Modal onClose={closeDownloadModal}>
          <Download downloadItems={downloadItems} items={downloadTarget} filename="user-list" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </MainTemplate>
  );
};

export default UserListPage;
