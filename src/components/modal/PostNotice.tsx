import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Editor from 'components/content/Editor';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_300 } from 'styles/color.constants';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { ExtendedNotice } from 'lib/modules/notice';
import Button from 'components/shared/Button';
import usePostNotice from 'hooks/content/usePostNotice';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/modules';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';

interface PostNoticeProps {
  onClose: () => void;
  data?: ExtendedNotice;
}

const PostNoticeBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1rem;
  margin-bottom: 7rem;
`;

const PostNotice: React.FC<PostNoticeProps> = ({ onClose, data }) => {
  const { editNotice, registerNotice } = usePostNotice();
  const loading = useSelector((state: RootState) => state.loading.postNotice);
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');
  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      if (data) {
        editNotice({ notice_id: data.id, title, description });
      } else {
        registerNotice({ title, description });
      }
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, description],
  );
  return (
    <ModalTemplate style={{ height: '50rem' }} onSubmit={onSubmit}>
      <ModalTemplateHeader>
        <span>게시물 추가하기</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <PostNoticeBody>
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
        <div style={{ width: '100%', height: '25rem' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>내용</div>
          <Editor value={description} onChange={(content) => setDescription(content)} />
        </div>
      </PostNoticeBody>
      <ModalTemplateFooter>
        <Button
          buttonColor={BRAND_COLOR_DARK_ORANGE}
          style={{ width: '10rem', height: '100%' }}
          type="submit"
          fullRounded
          loading={loading}
        >
          {loading ? 'loading...' : '작성하기'}
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default PostNotice;
