import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  BRAND_COLOR_DARK_ORANGE,
  GRAY_SCALE_200,
  GRAY_SCALE_300,
  GRAY_SCALE_400,
  GRAY_SCALE_BLACK,
  GRAY_SCALE_WHITE,
} from 'styles/color.constants';
import Button from 'components/shared/Button';
import { ExtendedCertified, getAllMissionListAsync, postMissionApplyAsync, SubMission } from 'lib/modules/certified-mission';
import DetailRow from './DetailRow';
import { checkValidCoordination, numberWithCommas } from 'lib/tools';
import Dropdown from 'components/shared/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/modules';
import { GetAllMissionListPayload, PostMissionApplyPayload } from 'lib/modules/shared';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';
import useModal from 'hooks/useModal';
import Modal from 'components/modal/Modal';
import Map from 'components/modal/Map';

const MISSION_HISTORY_SEPERATOR = ' 재인증에도 실패할 경우, 리워드가 지급되지 않으니 기한 내 재인증 부탁드립니다!';

const MISSION_FAIL_SEPERATOR = '또 다른 미션을 통해 리워드를 지급받으세요!';

interface CertifiedDetailProps {
  data: ExtendedCertified;
}

interface DistanceProps {
  order?: number;
  latitude: number;
  longitude: number;
  distance?: number;
}
interface ImageProps {
  src: string;
  alt: 'side' | 'back' | 'instrument_panel';
}

const CertifiedDetailContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 14rem);
  column-gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DistanceContainer = styled.div`
  width: 14rem;
  height: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const DistanceColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

const DistanceInput = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  border: 1px solid ${GRAY_SCALE_400};
  background-color: ${GRAY_SCALE_WHITE};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
`;

const Image: React.FC<ImageProps> = React.memo(({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '14rem',
        height: '14rem',
        backgroundColor: GRAY_SCALE_300,
        objectFit: 'cover',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
      }}
    />
  );
});

const Distance: React.FC<DistanceProps> = React.memo(({ distance = 0, latitude, longitude, order }) => {
  const [mapModal, openMapModal, closeMapModal] = useModal();
  const isValidCoord = checkValidCoordination(latitude, longitude);
  return (
    <DistanceContainer>
      <DistanceColumn>
        <span style={{ color: GRAY_SCALE_BLACK, fontSize: '0.875rem', marginBottom: '1rem', fontWeight: 'bold' }}>GPS</span>
        {latitude && longitude ? (
          isValidCoord ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span>위도: {latitude}</span>
              <span>경도: {longitude}</span>
              <Button buttonColor={BRAND_COLOR_DARK_ORANGE} hover noFill onClick={openMapModal}>
                지도 열기
              </Button>
            </div>
          ) : (
            <div>유효하지 않은 좌표 데이터입니다.</div>
          )
        ) : (
          <div>좌표 데이터가 없습니다.</div>
        )}
      </DistanceColumn>
      <DistanceColumn style={{ flex: 1 }}>
        <span
          style={{
            color: GRAY_SCALE_BLACK,
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
          }}
        >
          {order}회차 주행거리
        </span>
        <DistanceInput>
          <span>{numberWithCommas(distance)}</span>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
            }}
          >
            km
          </div>
        </DistanceInput>
      </DistanceColumn>
      {mapModal && (
        <Modal closeOnClickOutside={false} onClose={closeMapModal}>
          <Map latitude={latitude} longitude={longitude} />
        </Modal>
      )}
    </DistanceContainer>
  );
});

const Textarea = styled.textarea`
  grid-column: 1 / 4;
  height: 10rem;
  margin-top: 1rem;
  resize: none;
  outline: none;
  border: 1px solid ${GRAY_SCALE_200};
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const CertifiedDetail: React.FC<CertifiedDetailProps> = ({ data }) => {
  const dispatch = useDispatch();
  const allMissionLoading = useSelector((state: RootState) => state.loading.getAllMissionList);
  const getAllMissionList = useCallback(
    (payload: GetAllMissionListPayload) => dispatch(getAllMissionListAsync.request(payload)),
    [dispatch],
  );
  const postMissionApply = useCallback(
    (payload: Omit<PostMissionApplyPayload, 'ad_user_apply_id' | 'mission_card_id'>) =>
      dispatch(
        postMissionApplyAsync.request({
          ad_user_apply_id: data.ad_user_apply_id,
          mission_card_id: data.mission_card_id,
          ...payload,
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '승인',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        fullRounded: true,
        onClick: () => postMissionApply({ status: 'success' }),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [reason, setReason] = useState('GPS 정보가 제대로 나오지 않았습니다');
  const [openTextarea, setOpenTextarea] = useState(false);
  const [compareMission, setCompareMission] = useState<SubMission>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const missions = useMemo(
    () =>
      data.mission_list.map(m => ({
        label: m.mission_name,
        value: m.mission_name,
      })),
    [data.mission_list],
  );
  const onChangeMission = useCallback(
    (value: string | number) => {
      const mission = data.mission_list.find(item => item.mission_name === value);
      if (mission) {
        setCompareMission(mission);
      }
    },
    [data],
  );
  const onReject = useCallback(
    () => reason && postMissionApply({ status: 'reject', reason }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reason],
  );
  useEffect(() => {
    if (openTextarea) {
      textareaRef.current?.focus();
    }
  }, [openTextarea]);
  useEffect(() => {
    if (!compareMission && data.mission_list[0]) {
      setCompareMission(data.mission_list[0]);
    }
  }, [data.mission_list, compareMission]);
  return (
    <CertifiedDetailContainer>
      <DetailRow title="미션 인증 사진">
        <div
          style={{
            fontSize: '0.875rem',
            color: GRAY_SCALE_BLACK,
            marginBottom: '1rem',
          }}
        >
          {data.order === 0 ? data.mission_name : `${data.order}회차 필수 미션`}
        </div>
        <GridRow>
          <Image src={data.side_image} alt="side" />
          <Image src={data.back_image} alt="back" />
          <Image src={data.instrument_panel} alt="instrument_panel" />
          <Distance distance={data.travelled_distance} latitude={data.latitude} longitude={data.longitude} order={1} />
        </GridRow>
        {data.mission_list.length === 0 && (
          <GridRow>
            <Button
              buttonColor={BRAND_COLOR_DARK_ORANGE}
              noFill
              hover
              loading={allMissionLoading}
              style={{ gridColumn: '1 / 4' }}
              onClick={() =>
                getAllMissionList({
                  ad_user_apply_id: data.ad_user_apply_id,
                  mission_card_id: data.mission_card_id,
                })
              }
            >
              미션 불러오기
            </Button>
          </GridRow>
        )}
        {data.mission_list.length !== 0 && (
          <>
            <GridRow>
              <div style={{ gridColumn: '1 / 4' }}>
                <Dropdown
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '2.5rem',
                    backgroundColor: GRAY_SCALE_WHITE,
                  }}
                  options={missions}
                  onChange={onChangeMission}
                  defaultValue={1}
                />
              </div>
            </GridRow>
            <GridRow>
              <Image src={compareMission?.side_image || '/images/advertiser.png'} alt="side" />
              <Image src={compareMission?.back_image || '/images/advertiser.png'} alt="back" />
              {compareMission?.mission_type === 0 && (
                <>
                  <Image src={compareMission?.instrument_panel || '/images/advertiser.png'} alt="instrument_panel" />
                  <Distance
                    distance={compareMission?.travelled_distance}
                    latitude={compareMission?.latitude}
                    longitude={compareMission?.longitude}
                    order={2}
                  />
                </>
              )}
            </GridRow>
          </>
        )}
        <div
          style={{
            fontSize: '0.875rem',
            color: GRAY_SCALE_BLACK,
            marginBottom: '1rem',
          }}
        >
          실패 사유 선택
        </div>
        <GridRow>
          <div
            style={{
              gridColumn: '1 / 4',
              display: 'grid',
              gridTemplateColumns: '1fr 10rem',
              gridTemplateRows: '2.5rem',
              columnGap: '1rem',
            }}
          >
            <Dropdown
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: GRAY_SCALE_WHITE,
              }}
              options={[
                {
                  label: 'GPS 정보가 제대로 나오지 않았습니다',
                  value: 'GPS 정보가 제대로 나오지 않았습니다',
                },
                {
                  label: '스티커 사진이 제대로 나오지 않았습니다',
                  value: '스티커 사진이 제대로 나오지 않았습니다',
                },
                {
                  label: '계기판 숫자가 제대로 나오지 않았습니다',
                  value: '계기판 숫자가 제대로 나오지 않았습니다',
                },
                { label: '직접 입력', value: '' },
              ]}
              onChange={data => {
                setReason(data.toString());
                setOpenTextarea(!Boolean(data.toString()));
              }}
              defaultValue={'GPS 정보가 제대로 나오지 않았습니다'}
              removeSpacer
            />
            <Button
              buttonColor={BRAND_COLOR_DARK_ORANGE}
              noFill
              fullRounded
              style={{ width: '100%', height: '100%' }}
              onClick={onReject}
            >
              실패
            </Button>
          </div>
          {openTextarea && (
            <Textarea className="note-sans-kr" value={reason} ref={textareaRef} onChange={e => setReason(e.target.value)} />
          )}
          <div style={{ gridColumn: '1 / 5', marginTop: '1rem' }}>
            {data.mission_history.map(item => (
              <div
                key={item.register_time}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'max-content 1fr',
                  columnGap: '1rem',
                }}
              >
                <span>{item.register_time}</span>
                <span>{item.reason.split(MISSION_HISTORY_SEPERATOR)[0].split(MISSION_FAIL_SEPERATOR)[0] || '재인증 실패'}</span>
              </div>
            ))}
          </div>
        </GridRow>
      </DetailRow>
      <AlignButtonRow buttons={buttons} />
    </CertifiedDetailContainer>
  );
};

export default React.memo(CertifiedDetail);
