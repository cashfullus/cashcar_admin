import React, { forwardRef, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload } from 'quill-image-upload';
import 'react-quill/dist/quill.snow.css';
import "./style.css";
import { toast } from "react-toastify";
import { uploadFile } from 'lib/apis/file';

const BlockEmbed = Quill.import('blots/block/embed')
// const InlineBlot = Quill.import('blots/block');
const Link = Quill.import('formats/link');

class ImageBlot extends BlockEmbed {
  static create(data: any) {
    const node = super.create();
    if (data.url !== undefined) {
      node.setAttribute('src', this.sanitize(data.url));
      node.setAttribute('width', '100%');
    } else {
      node.setAttribute('src', this.sanitize(data));
      node.setAttribute('width', '100%');
    }
    return node;
  }

  static value(node: any) {
    return {
      url: node.getAttribute('src'),
    };
  }

  static sanitize(url: any) {
    return Link.sanitize(url);
  }
}
ImageBlot.blotName = 'imageBlot';
ImageBlot.className = 'image-blot';
ImageBlot.tagName = 'img';

const QuillVideo = Quill.import('formats/video')

const VIDEO_ATTRIBUTES = ['height', 'width']

// provides a custom div wrapper around the default Video blot
class Video extends BlockEmbed {
  static create(value: any) {
    const iframeNode = QuillVideo.create(value)
    const node = super.create()
    node.setAttribute("style", "width: 100%; position:relative; padding-bottom: 56.25%;")
    iframeNode.setAttribute("style", "position:absolute; top:0; left:0; width:100%; height:100%;")
    node.appendChild(iframeNode)
    return node
  }

  static formats(domNode: any) {
    const iframe = domNode.getElementsByTagName('iframe')[0]
    return VIDEO_ATTRIBUTES.reduce(function (formats: any, attribute: any) {
      if (iframe.hasAttribute(attribute)) {
        formats[attribute] = iframe.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static value(domNode: any) {
    return domNode.getElementsByTagName('iframe')[0].getAttribute('src')
  }

  format(name: any, value: any) {
    if (VIDEO_ATTRIBUTES.indexOf(name) > -1) {
      if (value) { this.domNode.setAttribute(name, value) }
      else { this.domNode.removeAttribute(name) }
    }
    else { super.format(name, value) }
  }
}

Video.blotName = 'video'
Video.className = 'ql-video-wrapper'
Video.tagName = 'DIV'

Quill.register(Video, true);
Quill.register({ 'formats/imageBlot': ImageBlot });
Quill.register('modules/imageUpload', ImageUpload);

interface EditorProps extends React.ComponentProps<typeof ReactQuill> {
  ref?: any;
}

const Editor: React.FC<EditorProps> = forwardRef(({ value, onChange, placeholder, style = { width: '100%', height: '100%' } }, ref: any) => {
  const quillRef = useRef<any>(null);
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      const formData = new FormData();
      formData.append('file', file!);
      try {
        const result = await uploadFile(formData);
        const IMG_URL = result.data;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'imageBlot', IMG_URL);
        editor.setSelection(range.index + 1);
      } catch (error) {
        // FAil
        if (error instanceof Error) {
          toast.error(`이미지 업로드에 실패했습니다. ${error.message}`, { position: toast.POSITION.TOP_RIGHT });
        }
      }
    });
  };
  const videoHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      const formData = new FormData();
      formData.append('file', file!);
      try {
        const result = await uploadFile(formData);
        const VIDEO_URL = result.data;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'video', VIDEO_URL);
        editor.setSelection(range.index + 1);
      } catch (error) {
        // FAil
        if (error instanceof Error) {
          toast.error(`비디오 업로드에 실패했습니다. ${error.message}`, { position: toast.POSITION.TOP_RIGHT });
        }
      }
    });
  };
  return (
    <ReactQuill
      ref={r => {
        ref = r;
        quillRef.current = r;
      }}
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
            ['image'],
            ['video'],
          ],
          handlers: {
            image: imageHandler,
            video: videoHandler,
          }
        },
      }}
    />
  );
});

export default React.memo(Editor);
