import React, { useMemo } from 'react';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { Pagination } from '@material-ui/lab';
import { dateOfBirthMapper, genderMapper } from 'lib/mapper';
import ADAPI from 'lib/apis/ad';
import ModalTemplate, { ModalTemplateHeader, PaginationFooter } from './ModalTemplate';
import { AD_USER_DISCRIMINATOR, ExtendedADUser } from 'lib/modules/ad';
import { ListColumn } from 'hooks/list/useColumn';
import List from 'components/list/List';
import { numberWithHyphen } from 'lib/tools';
import useModalItems from 'hooks/useModalItems';

interface ADUserListProps {
  onClose: () => void;
  adId: number;
}

const AD_USER_NICKNAME_COLUMN = '6.5rem';
const AD_USER_NAME_COLUMN = '4rem';
const AD_USER_CONTACT_COLUMN = '6.5rem';
const AD_USER_EMAIL_COLUMN = '8.5rem';
const AD_USER_VEHICLE_COLUMN = '1fr';
const AD_USER_GENDER_COLUMN = '3rem';
const AD_USER_AGE_COLUMN = '3rem';
const AD_USER_ACCEPT_COLUMN = '6rem';
const AD_USER_RECRUIT_COLUMN = '5rem';

const ADUserList: React.FC<ADUserListProps> = ({ onClose, adId }) => {
  const headerItems: ListColumn<ExtendedADUser>[] = useMemo(
    () => [
      { headerLabel: '별명', label: 'nickname', column: AD_USER_NICKNAME_COLUMN },
      { headerLabel: '본명', label: 'name', column: AD_USER_NAME_COLUMN },
      { headerLabel: '연락처', label: { key: 'call_number', mapper: numberWithHyphen }, column: AD_USER_CONTACT_COLUMN },
      { headerLabel: '이메일', label: 'email', truncate: true, column: AD_USER_EMAIL_COLUMN },
      {
        headerLabel: '등록차량',
        label: { key: ['car_number', 'brand', 'vehicle_model_name'], divider: ' ' },
        truncate: true,
        column: AD_USER_VEHICLE_COLUMN,
      },
      { headerLabel: '성별', label: { key: 'gender', mapper: genderMapper }, column: AD_USER_GENDER_COLUMN },
      { headerLabel: '연령', label: { key: 'birth_of_date', mapper: dateOfBirthMapper }, column: AD_USER_AGE_COLUMN },
      { headerLabel: '신청승인일', label: 'accept_status_time', column: AD_USER_ACCEPT_COLUMN },
      {
        headerLabel: '모집번호',
        label: { key: ['recruit_number', 'max_recruiting_count'], divider: '/' },
        column: AD_USER_RECRUIT_COLUMN,
      },
    ],
    [],
  );
  const extendAPIParams = useMemo(() => ({ ad_id: adId }), [adId]);
  const { loading, items, totalPage, onPageChange } = useModalItems<ExtendedADUser>({
    extendAPIParams,
    callPreventer: null,
    discriminator: AD_USER_DISCRIMINATOR,
    api: ADAPI.getADUserList,
  });
  return (
    <ModalTemplate style={{ height: '50rem' }}>
      <ModalTemplateHeader>
        <span>모집인원</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <List headerItems={headerItems} items={items} loading={loading} />
      {totalPage !== 0 && (
        <PaginationFooter>
          <Pagination onChange={onPageChange} count={totalPage} />
        </PaginationFooter>
      )}
    </ModalTemplate>
  );
};

export default React.memo(ADUserList);
