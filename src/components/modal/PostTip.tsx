import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Editor from 'components/content/Editor';
import {
  BRAND_COLOR_DARK_ORANGE,
  GRAY_SCALE_150,
  GRAY_SCALE_300,
  GRAY_SCALE_400,
  GRAY_SCALE_WHITE,
  SYSTEM_COLOR_BLUE,
  SYSTEM_COLOR_RED,
} from 'styles/color.constants';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import Button from 'components/shared/Button';
import { ExtendedCashcarTip } from 'lib/modules/tip';
import usePostTip from 'hooks/content/usePostTip';
import { convertURLsToFiles } from 'lib/tools';
import formDataConverter from 'lib/formDataConverter';
import { ReactComponent as CheckboxCheckedSvg } from 'assets/checkbox-checked-icon.svg';
import { ReactComponent as CheckboxSvg } from 'assets/checkbox-icon.svg';
import { ReactComponent as ChevronSvg } from 'assets/chevron-horizontal.svg';
import useImageSlide from 'hooks/useImageSlide';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';

interface PostTipProps {
  onClose: () => void;
  data?: ExtendedCashcarTip;
}

interface CheckButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
}

interface ExtendedFile {
  file: File;
  id: string;
  order: number;
}

const PostTipBody = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ImageCover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  position: absolute;
  z-index: 1;
  transition: 0.3s;
  opacity: 0;
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  user-select: none;
  border: 1px solid ${GRAY_SCALE_150};
  position: relative;
  box-sizing: border-box;
  &:hover {
    ${ImageCover} {
      opacity: 1;
    }
  }
`;

const CheckButton: React.FC<CheckButtonProps> = React.memo(({ checked, ...attrs }) => {
  return (
    <div
      {...attrs}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}
    >
      {checked ? <CheckboxCheckedSvg /> : <CheckboxSvg />}
    </div>
  );
});

const PostTip: React.FC<PostTipProps> = ({ onClose, data }) => {
  const { editCashcarTip, registerCashcarTip } = usePostTip();
  const { slideRef, scrollEnd, onScroll, gotoLeftSlide, gotoRightSlide } = useImageSlide();
  const [title, setTitle] = useState(data?.title || '');
  const [main_description, setDescription] = useState(data?.main_description || '');
  const [totalFiles, setTotalFiles] = useState<ExtendedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [dragged, setDragged] = useState<string>('');
  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      const formData = formDataConverter({
        title,
        main_description,
        tip_images: totalFiles.map(({ file }) => file).slice(1),
        thumbnail_image: totalFiles[0].file,
      });
      if (data) {
        editCashcarTip({
          cash_car_tip_id: data.id,
          formData,
        });
      } else {
        registerCashcarTip({ formData });
      }
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, main_description, totalFiles],
  );
  const initalImage = async (urls: string[]) => {
    const files = await convertURLsToFiles(urls);
    const totalFiles = files.map((file, order) => ({
      file,
      id: URL.createObjectURL(file),
      order,
    }));
    return setTotalFiles(totalFiles);
  };
  const onDragOver: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
  };
  const onDragStart: React.DragEventHandler<HTMLDivElement> = e => {
    setDragged(e.currentTarget.id);
  };
  const onDrop: React.DragEventHandler<HTMLDivElement> = e => {
    const draggedFile = totalFiles.find(file => file.id === dragged);
    const droppedFile = totalFiles.find(file => file.id === e.currentTarget.id);

    const dragBoxOrder = draggedFile?.order;
    const dropBoxOrder = droppedFile?.order;

    const newTotalFiles = totalFiles
      .map(file => {
        if (file.id === dragged) {
          file.order = dropBoxOrder!;
        }
        if (file.id === e.currentTarget.id) {
          file.order = dragBoxOrder!;
        }
        return file;
      })
      .sort((a, b) => a.order - b.order);

    setTotalFiles(newTotalFiles);
  };
  useEffect(() => {
    if (data?.image_information.length && data.image_information.length !== 0) {
      const tip_images = data.image_information.map(({ image }) => image);
      initalImage([data.thumbnail_image, ...tip_images]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalTemplate onSubmit={onSubmit}>
      <ModalTemplateHeader>
        <span>게시물 추가하기</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <PostTipBody>
        <div style={{ marginBottom: '1.5rem', width: '100%' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>제목</div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              border: `1px solid ${GRAY_SCALE_300}`,
              fontSize: '1.15rem',
              outline: 'none',
              padding: '0.5rem',
              width: '60%',
            }}
          />
        </div>
        <div style={{ width: '100%', height: '10rem', marginBottom: '6.5rem' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>설명</div>
          <Editor value={main_description} onChange={content => setDescription(content)} />
        </div>
        <div style={{ width: '100%', height: '11rem', marginBottom: '2rem' }}>
          <div
            style={{
              fontSize: '1.25rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span>이미지</span>
            <label
              style={{
                marginLeft: '0.75rem',
                backgroundColor: SYSTEM_COLOR_BLUE,
                color: GRAY_SCALE_WHITE,
                fontSize: '0.875rem',
                borderRadius: '1rem',
                padding: '0.2rem 0.6rem',
                userSelect: 'none',
                cursor: 'pointer',
              }}
            >
              추가
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={e => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    const startOrder = totalFiles.length === 0 ? 0 : totalFiles[totalFiles.length - 1].order + 1;
                    const mappedFiles = files.map((file, order) => ({
                      file,
                      id: URL.createObjectURL(file),
                      order: startOrder + order,
                    }));
                    return setTotalFiles(prev => [...prev, ...mappedFiles]);
                  }
                }}
              />
            </label>
            {selectedFiles.length !== 0 && totalFiles.length > 1 && (
              <div
                style={{
                  marginLeft: '0.75rem',
                  backgroundColor: SYSTEM_COLOR_RED,
                  color: GRAY_SCALE_WHITE,
                  fontSize: '0.875rem',
                  borderRadius: '1rem',
                  padding: '0.2rem 0.6rem',
                  userSelect: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setTotalFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
                  setSelectedFiles([]);
                }}
              >
                삭제
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            {!scrollEnd.left && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '3rem',
                  backgroundColor: 'rgba(254, 123, 18,  0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onClick={gotoLeftSlide}
              >
                <ChevronSvg
                  style={{
                    color: 'white',
                    transform: 'scale(2) rotate(180deg)',
                  }}
                />
              </div>
            )}
            {!scrollEnd.right && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '3rem',
                  backgroundColor: 'rgba(254, 123, 18, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onClick={gotoRightSlide}
              >
                <ChevronSvg
                  style={{
                    color: 'white',
                    transform: 'scale(2)',
                  }}
                  onClick={gotoRightSlide}
                />
              </div>
            )}
            <div
              onScroll={onScroll}
              ref={slideRef}
              style={{
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 10rem)',
                gridTemplateRows: '10rem',
                gridAutoColumns: '10rem',
                gridAutoFlow: 'column',
                columnGap: '0.5rem',
              }}
            >
              {totalFiles.map(({ id }, idx) => (
                <ImageWrapper key={id} id={id} draggable onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop}>
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                    }}
                    src={id}
                    alt="cash-car-img"
                  />
                  {idx !== 0 && (
                    <ImageCover
                      onClick={() =>
                        setSelectedFiles(prev => {
                          if (prev.includes(id)) {
                            return prev.filter(i => i !== id);
                          } else {
                            return prev.concat(id);
                          }
                        })
                      }
                    >
                      <CheckButton checked={selectedFiles.includes(id)} />
                    </ImageCover>
                  )}
                  {selectedFiles.includes(id) && <CheckButton checked />}
                </ImageWrapper>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-0.75rem', fontSize: '0.875rem', color: GRAY_SCALE_400 }}>
          <span>첫 번째 이미지가 썸네일로 설정되며 </span>
          <span style={{ color: BRAND_COLOR_DARK_ORANGE }}>파일명은 영어나 숫자</span>
          <span>로 입력해주세요</span>
        </div>
      </PostTipBody>
      <ModalTemplateFooter>
        <Button buttonColor={BRAND_COLOR_DARK_ORANGE} style={{ width: '10rem', height: '100%' }} type="submit" fullRounded>
          {data ? '수정하기' : '작성하기'}
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default PostTip;
