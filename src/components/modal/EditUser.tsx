import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ExtendedUser } from 'lib/modules/users';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_100, GRAY_SCALE_150, GRAY_SCALE_500 } from 'styles/color.constants';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import Button from 'components/shared/Button';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import Input from 'components/shared/Input';
import { dateOfBirthMapper } from 'lib/mapper';
import { Option } from 'types/common';
import Dropdown from 'components/shared/Dropdown';
import { numberWithCommas } from 'lib/tools';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';

interface EditUserProps {
  onClose?: () => void;
  data: ExtendedUser;
}

interface EditUserInputProps {
  register: UseFormRegisterReturn;
  dropdown?: boolean;
  disabled?: boolean;
  title: string;
  useSelect?: boolean;
  selectDefaultValue?: Option['value'];
  selectOptions?: Option[];
}

const EditUserBody = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  column-gap: 3rem;
  row-gap: 0.5rem;
  margin-bottom: 2.5rem;
`;

const EditUserInput: React.FC<EditUserInputProps> = React.memo(({ title, register, disabled, useSelect, selectOptions }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '5rem 1fr',
        alignItems: 'center',
      }}
    >
      <span style={{ fontSize: '0.875rem' }}>{title}</span>
      {useSelect ? (
        <Dropdown
          defaultValue={selectOptions ? selectOptions[0].value : ''}
          options={selectOptions || []}
          register={register}
          removeSpacer
          isDisabled={disabled}
          style={{
            position: 'relative',
            backgroundColor: disabled ? GRAY_SCALE_150 : GRAY_SCALE_100,
            width: '100%',
            border: 'none',
          }}
        />
      ) : (
        <Input register={register} isDisabled={disabled} />
      )}
    </div>
  );
});

const NICKNAME = 'nickname';
const DATE_OF_BIRTH = 'date_of_birth';
const NAME = 'name';
const MAIN_ADDRESS = 'main_address';
// const DETAIL_ADDRESS = "detail_address";
const CALL_NUMBER = 'call_number';
const GENDER = 'gender';
const EMAIL = 'email';
const AGE = 'age';
const POINT = 'deposit';

const EditUser: React.FC<EditUserProps> = ({ onClose, data }) => {
  const { register, setValue } = useForm();
  useEffect(() => {
    setValue(NICKNAME, data[NICKNAME]);
    setValue(DATE_OF_BIRTH, data[DATE_OF_BIRTH]);
    setValue(NAME, data[NAME]);
    setValue(MAIN_ADDRESS, data[MAIN_ADDRESS]);
    setValue(CALL_NUMBER, data[CALL_NUMBER]);
    setValue(GENDER, data[GENDER]);
    setValue(EMAIL, data[EMAIL]);
    setValue(POINT, numberWithCommas(data[POINT]));
    setValue(AGE, dateOfBirthMapper(data[DATE_OF_BIRTH]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <ModalTemplate>
      <ModalTemplateHeader>
        <span style={{ color: GRAY_SCALE_500 }}>회원 정보</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <EditUserBody>
        <EditUserInput title="별명" register={register(NICKNAME)} />
        <EditUserInput title="생년월일" register={register(DATE_OF_BIRTH)} disabled />
        <EditUserInput title="본명" register={register(NAME)} disabled />
        <EditUserInput title="주소" register={register(MAIN_ADDRESS)} />
        <EditUserInput title="연락처" register={register(CALL_NUMBER)} disabled />
        <EditUserInput
          title="성별"
          register={register(GENDER)}
          useSelect
          disabled
          selectOptions={[
            { label: '무관', value: 0 },
            { label: '남자', value: 1 },
            { label: '여자', value: 2 },
          ]}
        />
        <EditUserInput title="이메일" register={register(EMAIL)} />
        <EditUserInput title="연령" register={register(AGE)} disabled />
      </EditUserBody>
      {/* <div
        style={{
          width: "100%",
          marginBottom: "1.75rem",
          color: GRAY_SCALE_500,
        }}
      >
        등록 차량
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5rem repeat(4, 10rem)",
            columnGap: "0.5rem",
            placeItems: "start",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem" }}>차량 정보</span>
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
      </div> */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '7rem 10rem',
          placeItems: 'start',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.875rem', color: GRAY_SCALE_500 }}>보유 포인트</span>
        <Input unit="P" register={register(POINT)} isDisabled />
      </div>
      <ModalTemplateFooter>
        <Button buttonColor={BRAND_COLOR_DARK_ORANGE} style={{ width: '10rem', height: '100%' }} onClick={onClose} fullRounded>
          수정
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default EditUser;
