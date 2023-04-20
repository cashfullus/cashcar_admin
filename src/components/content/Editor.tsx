import React, { forwardRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload } from 'quill-image-upload';
import {  BoundsStatic, RangeStatic, DeltaStatic, Delta } from 'quill';
import 'react-quill/dist/quill.snow.css';
import {  UseFormRegisterReturn } from 'react-hook-form';

Quill.register('modules/imageUpload', ImageUpload);
interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): BoundsStatic;
  getSelection(focus?: boolean): RangeStatic;
  getContents(index?: number, length?: number): DeltaStatic;
}

interface EditorProps extends React.ComponentProps<typeof ReactQuill> {
  ref?: any;
}

const Editor: React.FC<EditorProps> = forwardRef(({ value, onChange, placeholder, style = { width: '100%', height: '100%' } }, ref: any) => {
  return (
    <ReactQuill
    ref={ref}
    value={value}
    onChange={onChange}
      style={style}
      placeholder={placeholder}
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
});

export default React.memo(Editor);
