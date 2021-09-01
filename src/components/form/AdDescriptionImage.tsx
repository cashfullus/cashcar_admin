import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_200, GRAY_SCALE_600, GRAY_SCALE_WHITE } from 'styles/color.constants';
import { ReactComponent as CameraSvg } from 'assets/camera.svg';
import { ReactComponent as TrashSvg } from 'assets/trash.svg';
import { convertURLsToFiles } from 'lib/tools';
import { AD_IMAGES, THUMBNAIL_IMAGE } from 'lib/input-name.constants';

interface AdDescriptionImageProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  images?: string[];
  thumbnailImage?: string;
}

const AdDescriptionImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 11.5rem);
  grid-auto-rows: 11.5rem;
  grid-gap: 1rem;
`;

const AdDescriptionImageCover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  background-color: ${BRAND_COLOR_DARK_ORANGE + '96'};
  color: ${GRAY_SCALE_WHITE};
  border-radius: 0.5rem;
  position: absolute;
  z-index: 1;
  transition: 0.3s;
  opacity: 0;
`;

const AdDescriptionImgWrapper = styled.div`
  cursor: pointer;
  position: relative;
  &:hover {
    ${AdDescriptionImageCover} {
      opacity: 1;
    }
  }
`;

const RemoveButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}
      onClick={onClick}
    >
      <TrashSvg />
    </div>
  );
};

const AdDescriptionImgElement = styled.img<{ isThumbnail?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: ${props => (props.isThumbnail ? `3px solid ${BRAND_COLOR_DARK_ORANGE}` : `1px solid ${GRAY_SCALE_200}`)};
  border-radius: 0.5rem;
`;

const AdDescriptionImage: React.FC<AdDescriptionImageProps> = ({ register, setValue, images, thumbnailImage }) => {
  const [thumbnailId, setThumbnailId] = useState('');
  const [totalFiles, setTotalFiles] = useState<{ file: File; id: string }[]>([]);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map(file => ({
        file,
        id: URL.createObjectURL(file),
      }));
      const nextTotalFiles = [...totalFiles, ...files].slice(0, 10);
      setTotalFiles(nextTotalFiles);
      if (thumbnailId === '') {
        setThumbnail(nextTotalFiles[0].file, nextTotalFiles[0].id);
      }
    } else {
      return;
    }
  };
  const setThumbnail = (file: File, id: string) => {
    setValue(THUMBNAIL_IMAGE, file);
    return setThumbnailId(id);
  };
  const onRemove = (selectedId: string) => {
    if (thumbnailId === selectedId) {
      setThumbnailId(totalFiles[0].id);
    }
    return setTotalFiles(totalFiles.filter(({ id }) => id !== selectedId));
  };
  const initalImage = async (urls: string[]) => {
    const files = await convertURLsToFiles(urls);
    const totalFiles = files.map(file => ({
      file,
      id: URL.createObjectURL(file),
    }));
    const thumbnail = totalFiles[0];
    setValue(THUMBNAIL_IMAGE, thumbnail.file);
    setValue(AD_IMAGES, files);
    setThumbnailId(thumbnail.id);
    return setTotalFiles(totalFiles);
  };
  useEffect(() => {
    setValue(
      AD_IMAGES,
      totalFiles.filter(({ id }) => id !== thumbnailId).map(({ file }) => file),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFiles, thumbnailId]);
  useEffect(() => {
    register(THUMBNAIL_IMAGE, { required: true });
    register(AD_IMAGES, { required: true });
    if (images && thumbnailImage) {
      initalImage([thumbnailImage, ...images]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdDescriptionImageContainer>
      {totalFiles.map(({ file, id }) => {
        return (
          <AdDescriptionImgWrapper onClick={() => setThumbnail(file, id)} key={id}>
            <AdDescriptionImgElement src={id} alt="img" isThumbnail={thumbnailId === id} />
            <AdDescriptionImageCover>
              <span>썸네일로 설정하기</span>
              <RemoveButton onClick={() => onRemove(id)} />
            </AdDescriptionImageCover>
          </AdDescriptionImgWrapper>
        );
      })}
      {totalFiles.length < 10 && (
        <label
          style={{
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <CameraSvg />
          <div
            style={{
              color: GRAY_SCALE_600,
              position: 'absolute',
              bottom: '4rem',
              left: '50%',
              transform: 'translateX(-50%)',
              userSelect: 'none',
            }}
          >
            <span>사진</span>
            <span>({totalFiles.length}/10)</span>
          </div>
          <input hidden type="file" accept="image/*" style={{ position: 'absolute' }} onChange={onChange} multiple />
        </label>
      )}
    </AdDescriptionImageContainer>
  );
};

export default React.memo(AdDescriptionImage);
