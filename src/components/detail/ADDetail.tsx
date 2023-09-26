import React, { useCallback, useMemo, useState } from 'react';
import { ExtendedAD } from 'lib/modules/ad';
import styled from 'styled-components';
import { ReactComponent as ChevronSvg } from 'assets/chevron-horizontal.svg';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_200, GRAY_SCALE_BLACK } from 'styles/color.constants';
import { genderMapper } from 'lib/mapper';
import { useHistory } from 'react-router';
import { EDIT_AD_URL } from 'routes/index';
import Modal from 'components/modal/Modal';
import ADUserList from 'components/modal/ADUserList';
import DetailRow from './DetailRow';
import { numberWithCommas } from 'lib/tools';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

interface ADDetailProps {
  data: ExtendedAD;
}

interface ADInfoItemProps {
  title: string;
  body: string | number;
  onIconClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface ADStickerItemProps {
  src: string;
  length: number;
  width: number;
  direction: '측면' | '후면';
  imgWidth?: string;
  imgHeight?: string;
}

interface ImageProps {
  src: string;
  thumbnail?: boolean;
  width?: string;
  height?: string;
  fullRounded?: boolean;
}

const Image: React.FC<ImageProps> = React.memo(
  ({ src, thumbnail = false, width = '176', height = '176', fullRounded = false }) => {
    return (
      <img
        src={src || '/images/car-side.png'}
        alt="side-img"
        width={width}
        height={height}
        style={{
          borderRadius: fullRounded ? '50%' : '0.5rem',
          marginBottom: '1rem',
          objectFit: 'cover',
          border: `1px solid ${GRAY_SCALE_200}`,
          ...(thumbnail && { border: `4px solid ${BRAND_COLOR_DARK_ORANGE}` }),
        }}
      />
    );
  },
);

const ADDetailContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ADInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ADMissionContainer = styled.div`
  font-size: 0.875rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MissionItem = styled.span`
  &:not(:last-child) {
    margin-bottom: 0.875rem;
  }
`;

const ADStickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ADDescriptionContainer = styled.div`
  width: 50%;
`;

const ADImageContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
`;

const ADInfoItem: React.FC<ADInfoItemProps> = React.memo(({ title, body, onIconClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '0.875rem',
      }}
    >
      <div style={{ width: '5rem' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{body}</span>
        {onIconClick && <ChevronSvg style={{ marginTop: '0.125rem', cursor: 'pointer' }} onClick={onIconClick} />}
      </div>
    </div>
  );
});

const ADMission: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <ADMissionContainer>
      <div style={{ marginRight: '1rem' }}>{title}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {children}
      </div>
    </ADMissionContainer>
  );
};

const ADStickerItem: React.FC<ADStickerItemProps> = React.memo(({ src, length, width, direction, imgWidth, imgHeight }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: '1.25rem',
      }}
    >
      <Image src={src} width={imgWidth} height={imgHeight} />
      <span style={{ color: GRAY_SCALE_BLACK }}>
        {direction} {length} x {width} cm
      </span>
    </div>
  );
});

const ADDetail: React.FC<ADDetailProps> = ({ data }) => {
  const history = useHistory();
  const [userListModal, setUserListModal] = useState(false);
  const openModal = useCallback(() => setUserListModal(true), []);
  const closeModal = useCallback(() => setUserListModal(false), []);
  const buttons: RowButtonProps[] = useMemo(
    () => [
      { text: '삭제', type: 'button', buttonColor: BRAND_COLOR_DARK_ORANGE, noFill: true, fullRounded: true },
      {
        text: '수정',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        fullRounded: true,
        hide: data.ad_status !== 'scheduled',
        onClick: () =>
          history.push({
            pathname: EDIT_AD_URL(data.id),
            state: data,
          }),
      },
    ],
    [data, history],
  );
  return (
    <ADDetailContainer>
      <DetailRow title="광고정보">
        <ADInfoContainer>
          <ADInfoItem title="광고명" body={data.title} />
          <ADInfoItem title="지역" body={data.area} />
          <ADInfoItem title="광고주" body={data.owner_name} />
          <ADInfoItem title="성별" body={genderMapper(data.gender)} />
          <ADInfoItem
            title="모집인원"
            body={[data.recruiting_count, data.max_recruiting_count].join(' / ')}
            onIconClick={openModal}
          />
          <ADInfoItem title="연령" body={data.max_age_group} />
          <div></div>
          <ADInfoItem title="최소거리" body={data.min_distance} />
        </ADInfoContainer>
      </DetailRow>
      <DetailRow title="미션 정보">
        <ADMission title="필수미션">
          {data.default_mission_items.map(item => (
            <MissionItem key={item.order}>
              <span style={{ marginRight: '0.75rem' }}>{item.order}회</span>
              <span style={{ marginRight: '1rem' }}>인증기한</span>
              <span>{item.due_date}일</span>
              <span style={{ margin: '0 0.5rem' }}>/</span>
              <span style={{ marginRight: '1.5rem' }}>활동 기간</span>
              <span>{item.based_on_activity_period}일 기준</span>
            </MissionItem>
          ))}
        </ADMission>
        <ADMission title="추가미션">
          {data.additional_mission_items.map((item, idx) => {
            const { mission_name, additional_point } = item;
            return (
              <MissionItem key={mission_name + idx.toString()}>
                <span style={{ marginRight: '1rem', fontWeight: 'bolder' }}>{item.mission_name}</span>
                <span style={{ marginRight: '1rem' }}>인증기한</span>
                <span>{item.due_date}일</span>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ marginRight: '1.5rem' }}>활동 기간</span>
                <span style={{ marginRight: '1.5rem' }}>{item.based_on_activity_period}일 기준</span>
                <span>{numberWithCommas(additional_point)} P</span>
              </MissionItem>
            );
          })}
        </ADMission>
      </DetailRow>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <DetailRow title="스티커 정보">
          <ADStickerContainer>
            <ADStickerItem
              src={data.side_image}
              length={data.side_length}
              width={data.side_width}
              imgWidth="246"
              imgHeight="176"
              direction="측면"
            />
            <ADStickerItem
              src={data.back_image}
              length={data.back_length}
              width={data.back_width}
              imgWidth="246"
              imgHeight="176"
              direction="후면"
            />
          </ADStickerContainer>
        </DetailRow>
        <DetailRow title="광고주 이미지" style={{ marginLeft: '7rem' }}>
          <ADStickerContainer>
            <Image src={data.logo_image || '/images/advertiser.png'} fullRounded />
          </ADStickerContainer>
        </DetailRow>
      </div>
      <DetailRow title="광고 설명">
        <ADDescriptionContainer>
          <div style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{__html: data.new_description}}></div>
          <ADImageContainer>
            <Image src={data.thumbnail_image} thumbnail />
            {data.ad_images.map(({ image }, idx) => (
              <Image key={idx} src={image} />
            ))}
          </ADImageContainer>
        </ADDescriptionContainer>
      </DetailRow>
      <AlignButtonRow buttons={buttons} />
      {userListModal && (
        <Modal onClose={closeModal}>
          <ADUserList adId={data.id} onClose={closeModal} />
        </Modal>
      )}
    </ADDetailContainer>
  );
};

export default React.memo(ADDetail);
