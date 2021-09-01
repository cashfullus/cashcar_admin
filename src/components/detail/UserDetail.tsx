import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronSvg } from 'assets/chevron-horizontal.svg';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_BLACK } from 'styles/color.constants';
import { dateOfBirthMapper, genderMapper, koreanBirthMapper, marketingMapper } from 'lib/mapper';
import DetailRow from 'components/detail/DetailRow';
import { ExtendedUser, UserVehicle } from 'lib/modules/users';
import Modal from 'components/modal/Modal';
import UserPointHistory from 'components/modal/UserPointHistory';
import EditUser from 'components/modal/EditUser';
import { numberWithCommas, numberWithHyphen } from 'lib/tools';
import { Pagination } from '@material-ui/lab';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';
import useModal from 'hooks/useModal';

interface UserDetailProps {
  data: ExtendedUser;
}

interface UserInfoItemProps {
  title?: string;
  body: string | number;
  onIconClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface UserVehicleItemProps extends UserVehicle {}

const UserDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'user-info user-info'
    'vehicle point'
    'vehicle marketing'
    'activity activity'
    'button button';
`;

const UserInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0.75rem;
`;

const UserXItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.875rem;
  color: ${GRAY_SCALE_BLACK};
`;

const UserInfoItem: React.FC<UserInfoItemProps> = React.memo(({ title, body, onIconClick }) => {
  return (
    <UserXItemContainer>
      {title && <div style={{ width: '5rem' }}>{title}</div>}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{body}</span>
        {onIconClick && <ChevronSvg style={{ marginTop: '0.125rem', cursor: 'pointer' }} onClick={onIconClick} />}
      </div>
    </UserXItemContainer>
  );
});

const UserVehicleItem: React.FC<UserVehicleItemProps> = React.memo(props => {
  return (
    <UserXItemContainer
      style={{
        ...(Boolean(props.supporters) && { color: BRAND_COLOR_DARK_ORANGE }),
        display: 'grid',
        gridTemplateColumns: '7rem 7rem 7rem 8rem',
        columnGap: '0.5rem',
        marginBottom: '0.875rem',
      }}
    >
      <div>{props.car_number}</div>
      <div>{props.brand}</div>
      <div>{props.vehicle_model_name}</div>
      <div>{props.owner_relationship}</div>
    </UserXItemContainer>
  );
});

const UserDetail: React.FC<UserDetailProps> = ({ data }) => {
  const [historyPage, setHistoryPage] = useState(1);
  const [pointModal, openPointModal, closePointModal] = useModal();
  const [editUserModal, openEditUserModal, closeEditUserModal] = useModal();
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '삭제',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        noFill: true,
        fullRounded: true,
      },
      {
        text: '수정',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        fullRounded: true,
        onClick: openEditUserModal,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <UserDetailContainer>
      <DetailRow title="회원정보" style={{ gridArea: 'user-info' }}>
        <UserInfoContainer>
          <UserInfoItem title="별명" body={data.nickname} />
          <UserInfoItem title="생년월일" body={koreanBirthMapper(data.date_of_birth)} />
          <UserInfoItem title="본명" body={data.name} />
          <UserInfoItem title="주소" body={`${data.main_address} ${data.detail_address}`} />
          <UserInfoItem title="연락처" body={numberWithHyphen(data.call_number)} />
          <UserInfoItem title="성별" body={genderMapper(data.gender)} />
          <UserInfoItem title="이메일" body={data.email} />
          <UserInfoItem title="연령" body={dateOfBirthMapper(data.date_of_birth)} />
        </UserInfoContainer>
      </DetailRow>
      <DetailRow title="등록차량" style={{ gridArea: 'vehicle' }}>
        {data.vehicle_information
          .sort((v1, v2) => v2.supporters - v1.supporters)
          .map(vehicle => (
            <UserVehicleItem key={vehicle.car_number} {...vehicle} />
          ))}
      </DetailRow>
      <DetailRow title="보유 포인트" style={{ gridArea: 'point', placeSelf: 'start' }} horizontal>
        <UserInfoItem body={`${numberWithCommas(data.deposit)} P`} onIconClick={openPointModal} />
      </DetailRow>
      <DetailRow title="마케팅 수신" style={{ gridArea: 'marketing', placeSelf: 'start' }} horizontal>
        <UserInfoItem body={marketingMapper(data.marketing)} />
      </DetailRow>
      <DetailRow title="활동 내역" style={{ gridArea: 'activity' }}>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(10, 1.5rem)', rowGap: '0.5rem' }}>
          {data.activity_history.slice((historyPage - 1) * 10, historyPage * 10).map(({ register_time, history_name }, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ marginRight: '0.75rem' }}>{register_time}</span>
              <span>{history_name}</span>
            </div>
          ))}
        </div>
        {data.activity_history.length !== 0 && (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
            <Pagination
              count={Math.ceil(data.activity_history.length / 10)}
              size="small"
              page={historyPage}
              onChange={(_, p) => setHistoryPage(p)}
            />
          </div>
        )}
      </DetailRow>
      <AlignButtonRow style={{ gridArea: 'button' }} buttons={buttons} />
      {pointModal && (
        <Modal onClose={closePointModal}>
          <UserPointHistory userId={data.id} deposit={data.deposit} />
        </Modal>
      )}
      {editUserModal && (
        <Modal onClose={closeEditUserModal}>
          <EditUser data={data} />
        </Modal>
      )}
    </UserDetailContainer>
  );
};

export default React.memo(UserDetail);
