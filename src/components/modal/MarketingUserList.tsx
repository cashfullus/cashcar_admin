import React, { useCallback, useMemo } from 'react';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import { Pagination } from '@material-ui/lab';
import { genderMapper, getVehicleMapper } from 'lib/mapper';
import { numberWithHyphen } from 'lib/tools';
import Filter from 'components/filter/Filter';
import { FilterItem, Option } from 'types/common';
import List from 'components/list/List';
import alarmAPI from 'lib/apis/alarm';
import { MARKETING_USER_DISCRIMINATOR, ExtendedMarketingUser } from 'lib/modules/push';
import { ListColumn } from 'hooks/list/useColumn';
import ModalTemplate, { PaginationFooter } from './ModalTemplate';
import useModalItems from 'hooks/useModalItems';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

interface MarketingUserData {
  id: number | string;
  name: string;
}

interface MarketingUserListProps {
  onClose: () => void;
  appPushUser: MarketingUserData[];
  togglePushUser: (data: MarketingUserData) => void;
  selectPushUserList: (data: MarketingUserData[]) => void;
  deselectPushUserList: (data: MarketingUserData[]) => void;
  clearPushUserList: () => void;
}

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
      { label: '남자', value: 'male' },
      { label: '여자', value: 'female' },
    ],
  },
  {
    name: 'age',
    label: '나이',
    filters: [
      { label: '10대', value: '10' },
      { label: '20대', value: '20' },
      { label: '30대', value: '30' },
      { label: '40대', value: '40' },
      { label: '50대', value: '50' },
      { label: '60대 이상', value: '60' },
    ],
  },
  {
    name: 'createdAt',
    label: '가입일',
    date: true,
  },
];

const headerItems: ListColumn<ExtendedMarketingUser>[] = [
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
    label: { key: 'vehicle_information', mapper: getVehicleMapper },
    column: USER_CAR_COLUMN,
  },
  {
    headerLabel: '성별',
    label: { key: 'gender', mapper: genderMapper },
    column: USER_GENDER_COLUMN,
  },
  {
    headerLabel: '연령',
    label: 'age',
    column: USER_AGE_COLUMN,
  },
  {
    headerLabel: '가입일',
    label: 'register_time',
    column: USER_CREATED_AT_COLUMN,
  },
];

const ITEM_COUNT = 8;

const MarketingUserList: React.FC<MarketingUserListProps> = ({
  onClose,
  appPushUser,
  togglePushUser,
  selectPushUserList,
  deselectPushUserList,
  clearPushUserList,
}) => {
  const { loading, items, totalPage, onPageChange } = useModalItems<ExtendedMarketingUser>({
    callPreventer: null,
    discriminator: MARKETING_USER_DISCRIMINATOR,
    api: alarmAPI.getMarketingUserList,
  });
  const headerChecked = useMemo(
    () => (appPushUser.length === ITEM_COUNT || appPushUser.length === items.length) && items.length !== 0,
    [items, appPushUser],
  );
  const onHeaderCheckboxClick = useCallback(() => {
    if (headerChecked) {
      deselectPushUserList(items.map(({ id, name }) => ({ id, name })));
    } else {
      selectPushUserList(items.map(({ id, name }) => ({ id, name })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerChecked, items]);
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '취소',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        noFill: true,
        fullRounded: true,
        onClick: () => {
          clearPushUserList();
          onClose();
        },
      },
      {
        text: '선택',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        fullRounded: true,
        onClick: onClose,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <ModalTemplate style={{ height: '50rem' }}>
      <Filter target="push" options={options} filterItems={filterItems} onSubmit={data => console.log(data)} />
      <List
        loading={loading}
        onCheckboxClick={({ id, name }) => togglePushUser({ id, name })}
        selected={appPushUser.map(user => user.id)}
        headerChecked={headerChecked}
        onHeaderCheckboxClick={onHeaderCheckboxClick}
        headerItems={headerItems}
        items={items}
      />
      <PaginationFooter>
        <Pagination onChange={onPageChange} count={totalPage} />
        <AlignButtonRow buttons={buttons} />
      </PaginationFooter>
    </ModalTemplate>
  );
};

export default React.memo(MarketingUserList);
