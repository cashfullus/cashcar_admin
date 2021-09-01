import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { GRAY_SCALE_200 } from 'styles/color.constants';
import { convertURLtoFile } from 'lib/tools';
import Input from './Input';

interface ImageProps {
  src: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  width?: string;
  height?: string;
  needImgInfo?: boolean;
  objectFit?: 'contain' | 'cover';
  fullRounded?: boolean;
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ImageInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const INPUT_NAME = (name: string) => ({ img: `${name}_image`, width: `${name}_width`, length: `${name}_length` });

const Image: React.FC<ImageProps> = ({
  src,
  name,
  register,
  setValue,
  width = '11rem',
  height = '11rem',
  needImgInfo = false,
  fullRounded = false,
  objectFit = 'contain',
}) => {
  const inputName = INPUT_NAME(name);
  const [previewSrc, setPreviewSrc] = useState(src);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      setValue(inputName.img, e.target.files[0]);
      return setPreviewSrc(URL.createObjectURL(e.target.files[0]));
    } else {
      return [];
    }
  };
  const initialImage = async (url: string) => {
    if (url.startsWith('https')) {
      const file = await convertURLtoFile(url);
      setPreviewSrc(URL.createObjectURL(file));
      return setValue(inputName.img, file);
    }
  };
  useEffect(() => {
    register(inputName.img, { required: true });
    initialImage(src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ImageContainer>
      <label style={{ marginBottom: '0.75rem', cursor: 'pointer' }}>
        <img
          src={previewSrc}
          alt={inputName.img}
          style={{
            width,
            height,
            objectFit,
            ...(!previewSrc.startsWith('/image') && {
              borderRadius: fullRounded ? '50%' : '0.5rem',
              border: `1px solid ${GRAY_SCALE_200}`,
            }),
          }}
        />
        <input hidden type="file" accept="image/*" onChange={onChange} />
      </label>
      {needImgInfo && (
        <ImageInfoContainer>
          <Input
            containerStyle={{ width: '4rem' }}
            placeholder="가로"
            register={register(inputName.length, {
              required: true,
              valueAsNumber: true,
            })}
          />
          <span style={{ margin: '0 0.5rem' }}>X</span>
          <Input
            containerStyle={{ width: '4rem' }}
            placeholder="세로"
            register={register(inputName.width, {
              required: true,
              valueAsNumber: true,
            })}
          />
          <span style={{ marginLeft: '0.5rem' }}>cm</span>
        </ImageInfoContainer>
      )}
    </ImageContainer>
  );
};

export default Image;
