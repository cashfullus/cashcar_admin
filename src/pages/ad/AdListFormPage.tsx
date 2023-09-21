/* eslint-disable no-empty-pattern */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Spacer } from 'components/shared/Header';
import MainTemplate from 'templates/MainTemplate';
import Input from 'components/shared/Input';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_100, GRAY_SCALE_400, GRAY_SCALE_BLACK } from 'styles/color.constants';
import Dropdown from 'components/shared/Dropdown';
import RangeInput from 'components/shared/RangeInput';
import formDataConverter from 'lib/formDataConverter';
import DefaultMission from 'components/form/DefaultMission';
import AdditionalMission from 'components/form/AdditionalMission';
import { RouteComponentProps } from 'react-router';
import { ExtendedAD, postADAsync } from 'lib/modules/ad';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from 'lib/modules';
import Loading from 'components/modal/Loading';
import useModal from 'hooks/useModal';
import Modal from 'components/modal/Modal';
import AreaList from 'components/modal/AreaList';
import {
  ACTIVITY_PERIOD,
  AREA,
  GENDER,
  MAX_AGE_GROUP,
  MAX_RECRUITING_COUNT,
  MIN_AGE_GROUP,
  MIN_DISTANCE,
  OWNER_NAME,
  RECRUIT,
  TITLE,
  TOTAL_POINT,
} from 'lib/input-name.constants';
import RangeDropdown from 'components/shared/RangeDropdown';
import ADStickerImage from 'components/form/ADStickerImage';
import ADDescription from 'components/form/ADDescription';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  column-gap: 2rem;
  row-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 3.5rem;
`;

const GridItem: React.FC<{ title: string }> = React.memo(({ title, children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '4.5rem 1fr',
        gridAutoRows: '3rem',
        placeContent: 'start',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{ fontSize: '0.875rem', color: GRAY_SCALE_BLACK }}>{title}</div>
      {children}
    </div>
  );
});

const AreaInput = styled.div`
  width: 80%;
  padding: 0.875rem 1rem;
  background-color: ${GRAY_SCALE_100};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${GRAY_SCALE_400};
`;

const AdListFormPage = ({ location: { state }, history }: RouteComponentProps<{}, {}, ExtendedAD | undefined>) => {
  const dispatch = useDispatch();
  const [areaModal, openAreaModal, closeAreaModal] = useModal();
  const loading = useSelector((state: RootState) => state.loading.postAD);
  const additionalMissions = state?.additional_mission_items.map((item, idx) => ({
    order: idx + 1,
    mission_type: item.mission_type,
    mission_name: item.mission_name,
    based_on_activity_period: item.based_on_activity_period.toString(),
    due_date: item.due_date.toString(),
    additional_point: item.additional_point.toString(),
  }));
  const defaultMissions = state?.default_mission_items.map(item => ({
    mission_type: item.mission_type,
    order: item.order,
    based_on_activity_period: item.based_on_activity_period.toString(),
    due_date: item.due_date.toString(),
  }));
  const { register, setValue, handleSubmit, getValues } = useForm(
    state && {
      defaultValues: state,
    },
  );

  const onAreaSelect = (areas: string[]) => {
    setValue(AREA, areas.join('/'));
    closeAreaModal();
  };
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '취소',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        type: 'button',
        noFill: true,
        fullRounded: true,
        onClick: history.goBack,
      },
      { text: state ? '수정' : '등록', buttonColor: BRAND_COLOR_DARK_ORANGE, type: 'submit', fullRounded: true },
    ],
    [history, state],
  );
  useEffect(() => {
    register(GENDER, { valueAsNumber: true });
    register(MIN_AGE_GROUP, { valueAsNumber: true });
    register(MAX_AGE_GROUP, { valueAsNumber: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainTemplate>
      <Helmet>
        <title>{state ? '광고 수정하기' : '광고 추가하기'}</title>
      </Helmet>
      <Spacer />
      <FormContainer
        onSubmit={handleSubmit(data => {
          dispatch(
            postADAsync.request({
              usage: state ? 'edit' : 'register',
              formData: formDataConverter(data),
              adId: state?.id,
            }),
          );
        })}
      >
        <GridContainer>
          <GridItem title="모집기간">
            <RangeInput name={RECRUIT} width="80%" type="date" register={register} required />
          </GridItem>
          <GridItem title="포인트">
            <Input
              register={register(TOTAL_POINT, {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="내용을 입력"
              containerStyle={{ width: '40%' }}
            />
          </GridItem>
          <GridItem title="광고명">
            <Input register={register(TITLE, { required: true })} placeholder="내용을 입력" containerStyle={{ width: '80%' }} />
          </GridItem>
          <GridItem title="활동기간">
            <Input
              register={register(ACTIVITY_PERIOD, {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="내용을 입력"
              containerStyle={{ width: '40%' }}
            />
          </GridItem>
          <GridItem title="광고주">
            <Input
              register={register(OWNER_NAME, { required: true })}
              placeholder="내용을 입력"
              containerStyle={{ width: '40%' }}
            />
          </GridItem>
          <GridItem title="모집인원">
            <Input
              register={register(MAX_RECRUITING_COUNT, {
                valueAsNumber: true,
              })}
              placeholder="내용을 입력"
              containerStyle={{ width: '40%' }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem title="지역">
            <AreaInput onClick={openAreaModal}>{getValues()[AREA] || '지역 설정하기'}</AreaInput>
          </GridItem>
          <GridItem title="성별">
            <Dropdown
              removeSpacer
              style={{
                position: 'relative',
                backgroundColor: GRAY_SCALE_100,
                border: 'none',
              }}
              options={[
                { label: '무관', value: 0 },
                { label: '남자', value: 1 },
                { label: '여자', value: 2 },
              ]}
              defaultValue={state?.gender || 0}
              register={register(GENDER)}
            />
          </GridItem>
          <GridItem title="최소거리">
            <Input
              register={register(MIN_DISTANCE, { valueAsNumber: true })}
              placeholder="내용을 입력"
              unit="Km"
              containerStyle={{ width: '40%' }}
            />
          </GridItem>
          <GridItem title="연령">
            <RangeDropdown
              register={register}
              minName={MIN_AGE_GROUP}
              maxName={MAX_AGE_GROUP}
              options={[
                { label: '무관', value: 0 },
                { label: '10대', value: 10 },
                { label: '20대', value: 20 },
                { label: '30대', value: 30 },
                { label: '40대', value: 40 },
                { label: '50대', value: 50 },
                { label: '60대 이상', value: 60 },
              ]}
              defaultMinValue={state?.min_age_group}
              defaultMaxValue={state?.max_age_group}
            />
          </GridItem>
        </GridContainer>
        <GridContainer
          style={{ marginBottom: '1rem', fontSize: '0.875rem', color: BRAND_COLOR_DARK_ORANGE, gridTemplateColumns: 'initial' }}
        >
          ※ 활동기간 기준으로 미션을 설정할 때는 [원하는 날-1] 입력 ex)28일에 오픈 원하면 27일 입력
        </GridContainer>
        <DefaultMission register={register} setValue={setValue} defaultMissions={defaultMissions} />
        <AdditionalMission register={register} setValue={setValue} additionalMissions={additionalMissions} />
        <ADStickerImage
          register={register}
          setValue={setValue}
          sideImage={state?.side_image}
          backImage={state?.back_image}
          logoImage={state?.logo_image}
        />
        <ADDescription
          getValues={getValues}
          adImages={state?.ad_images.map(({ image }) => image)}
          register={register}
          setValue={setValue}
          thumbnailImage={state?.thumbnail_image}
        />
        <AlignButtonRow buttons={buttons} paddingBottom="1.5rem" />
      </FormContainer>
      {loading && <Loading />}
      {areaModal && (
        <Modal closeOnClickOutside={false} onClose={closeAreaModal}>
          <AreaList onClose={closeAreaModal} onSelect={onAreaSelect} getValues={getValues} />
        </Modal>
      )}
    </MainTemplate>
  );
};

export default AdListFormPage;
