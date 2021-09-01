import React from 'react';
import Image from 'components/shared/Image';
import { BACK_IMAGE, LOGO_IMAGE, SIDE_IMAGE } from 'lib/input-name.constants';
import styled from 'styled-components';
import { GRAY_SCALE_BLACK } from 'styles/color.constants';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface ADStickerImageProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  sideImage?: string;
  backImage?: string;
  logoImage?: string;
}

const ADStickerImageContainer = styled.div`
  width: 100%;
  font-size: 0.875rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 3.5rem;
  color: ${GRAY_SCALE_BLACK};
`;

const ADStickerImageColumn: React.FC<{ title: string; gap?: string }> = ({ children, title, gap }) => {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>{title}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ADStickerImage: React.FC<ADStickerImageProps> = ({ register, setValue, sideImage, backImage, logoImage }) => {
  return (
    <ADStickerImageContainer>
      <ADStickerImageColumn title="스티커 정보" gap="1rem">
        <Image
          src={sideImage || '/images/car-side.png'}
          name={SIDE_IMAGE}
          register={register}
          setValue={setValue}
          needImgInfo
          width="15.375rem"
          height="11rem"
        />
        <Image
          src={backImage || '/images/car-back.png'}
          name={BACK_IMAGE}
          register={register}
          setValue={setValue}
          needImgInfo
          width="15.375rem"
          height="11rem"
        />
      </ADStickerImageColumn>
      <ADStickerImageColumn title="광고주 이미지">
        <Image
          src={logoImage || '/images/advertiser.png'}
          register={register}
          setValue={setValue}
          name={LOGO_IMAGE}
          fullRounded
          objectFit="cover"
        />
      </ADStickerImageColumn>
    </ADStickerImageContainer>
  );
};

export default React.memo(ADStickerImage);
