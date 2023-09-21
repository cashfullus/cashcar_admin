import React, { useEffect } from 'react';
import styled from 'styled-components';
import { HTML_DESCRIPTION, PLAIN_TEXT_DESCRIPTION } from 'lib/input-name.constants';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_100, GRAY_SCALE_300, GRAY_SCALE_400, GRAY_SCALE_BLACK } from 'styles/color.constants';
import AdDescriptionImage from './AdDescriptionImage';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Editor from 'components/content/Editor';
import convertDOMToString from 'lib/dom-parser';

interface ADDescriptionProps {
  adImages?: string[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  thumbnailImage?: string;
}

const ADDescriptionContainer = styled.div`
  width: 100%;
  font-size: 0.875rem;
  display: flex;
  margin-bottom: 3.5rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${GRAY_SCALE_BLACK};
`;

const ADDescriptionTextarea = styled.textarea`
  width: 45rem;
  height: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${GRAY_SCALE_100};
  outline: none;
  border: none;
  resize: none;
`;

const ADDescriptionHelpText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${GRAY_SCALE_400};
`;

const ADDescription: React.FC<ADDescriptionProps> = ({ adImages, register, thumbnailImage, setValue, getValues }) => {
  useEffect(() => {
    register(HTML_DESCRIPTION, { required: true });
    register(PLAIN_TEXT_DESCRIPTION, { required: true });
  }, [register]);
  return (
    <ADDescriptionContainer>
      <div style={{ marginBottom: '1rem' }}>광고 설명</div>
      <div style={{ width: '100%', height: '20rem', marginBottom: '6.5rem' }}>
      <Editor value={getValues(HTML_DESCRIPTION)} onChange={(content) => {
        setValue(PLAIN_TEXT_DESCRIPTION, convertDOMToString(content));
        setValue(HTML_DESCRIPTION, content);
      }} style={{width: '60%', height: '100%'}} />
        </div>

      {/* <ADDescriptionTextarea placeholder="내용을 입력해주세요" {...register(DESCRIPTION, { required: true })} /> */}
      <ADDescriptionHelpText>
        <span>썸네일 포함 2장 이상 업로드 해야하며 썸네일로 설정한 이미지는 광고 상세 페이지에 노출되지 않습니다. </span>
        <span style={{ color: BRAND_COLOR_DARK_ORANGE }}>이미지 파일명은 숫자나 영어</span>
        <span>로 업로드 해주세요. (추천 : 광고번호_숫자/영어)</span>
      </ADDescriptionHelpText>
      <AdDescriptionImage images={adImages} thumbnailImage={thumbnailImage} register={register} setValue={setValue} />
    </ADDescriptionContainer>
  );
};

export default React.memo(ADDescription);
