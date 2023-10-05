import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const formats = [
    'font',
    'size',
    'header',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <>
      <ReactQuill
        style={{ width: '100%' }}
        ref={quillRef}
        value={value}
        formats={formats}
        onChange={setValue}
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

export default QuillEditor;
