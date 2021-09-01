import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload } from 'quill-image-upload';
import { Sources, BoundsStatic, RangeStatic, DeltaStatic, Delta } from 'quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUpload', ImageUpload);
interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): BoundsStatic;
  getSelection(focus?: boolean): RangeStatic;
  getContents(index?: number, length?: number): DeltaStatic;
}

interface EditorProps {
  value: string;
  onChange: (content: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      style={{ width: '100%', height: '100%' }}
      modules={{
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
          ],
        },
      }}
    />
  );
};

export default React.memo(Editor);
