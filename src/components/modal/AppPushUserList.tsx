import React, { useEffect, useMemo } from 'react';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import { Pagination } from '@material-ui/lab';
import { appPushStatusMapper, genderMapper, getVehicleMapper } from 'lib/mapper';
import { numberWithHyphen } from 'lib/tools';
import List from 'components/list/List';
import alarmAPI from 'lib/apis/alarm';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { ExtendedAppPushUser, APP_PUSH_USER_DISCRIMINATOR } from 'lib/modules/push';
import usePostAppPush from 'hooks/alarm/usePostAppPush';
import { ListColumn } from 'hooks/list/useColumn';
import Button from 'components/shared/Button';
import ModalTemplate, { ModalTemplateHeader, PaginationFooter } from './ModalTemplate';
import useModalItems from 'hooks/useModalItems';

interface AppPushUserListProps {
  onClose: () => void;
  appPushId?: number;
}

const USER_NAME_COLUMN = '5.75rem';
const USER_CONTACT_COLUMN = '6.5rem';
const USER_CAR_COLUMN = '1fr';
const USER_GENDER_COLUMN = '3.5rem';
const USER_AGE_COLUMN = '3rem';
const USER_REGISTER_TIME_COLUMN = '7rem';
const USER_UPDATED_TIME_COLUMN = '7rem';
const USER_STATUS_COLUMN = '3.5rem';
const USER_RETRANSFER_COLUMN = '6rem';

const AppPushUserList: React.FC<AppPushUserListProps> = ({ onClose, appPushId }) => {
  const headerItems: ListColumn<ExtendedAppPushUser>[] = useMemo(
    () => [
      { headerLabel: '본명', label: 'name', column: USER_NAME_COLUMN },
      {
        headerLabel: '연락처',
        label: { key: 'call_number', mapper: numberWithHyphen },
        column: USER_CONTACT_COLUMN,
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
        headerLabel: '발송시간',
        label: 'register_time',
        column: USER_REGISTER_TIME_COLUMN,
      },
      {
        headerLabel: '수신시간',
        label: 'updated_time',
        column: USER_UPDATED_TIME_COLUMN,
      },
      {
        headerLabel: '상태',
        label: { key: 'status', mapper: appPushStatusMapper },
        column: USER_STATUS_COLUMN,
      },
      {
        headerLabel: '재전송',
        label: '',
        column: USER_RETRANSFER_COLUMN,
        customContent: (_, data) => {
          if (data.status !== 'fail') {
            return <span></span>;
          }
          return (
            <Button
              buttonColor={BRAND_COLOR_DARK_ORANGE}
              onClick={() => {
                if (!appPushId) {
                  return;
                }
                return resendAppPush({ id: appPushId, user_id: data.id });
              }}
              style={{ cursor: 'pointer' }}
              fullRounded
            >
              재전송
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const extendAPIParams = useMemo(() => ({ id: appPushId }), [appPushId]);
  const { loading, items, totalPage, onPageChange } = useModalItems<ExtendedAppPushUser>({
    extendAPIParams,
    callPreventer: appPushId,
    discriminator: APP_PUSH_USER_DISCRIMINATOR,
    api: alarmAPI.getAppPushUserList,
  });
  const { resendAppPush } = usePostAppPush();
  return (
    <ModalTemplate style={{ height: '50rem' }}>
      <ModalTemplateHeader>
        <span>전송상태</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <List headerItems={headerItems} items={items} loading={loading} />
      <PaginationFooter>
        <Pagination onChange={onPageChange} count={totalPage} />
      </PaginationFooter>
    </ModalTemplate>
  );
};

export default React.memo(AppPushUserList);
