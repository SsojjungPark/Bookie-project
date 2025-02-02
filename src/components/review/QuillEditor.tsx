import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  editorOnChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ editorOnChange }) => {
  const [text, setText] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

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

  const handleEditorChange = (value: string) => {
    setText(value);
    editorOnChange(value);
  };

  return (
    <>
      <StyledQuill
        value={text}
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default QuillEditor;

const StyledQuill = styled(ReactQuill)`
  width: 100%;
  background-color: var(--white-color);

  .ql-toolbar {
    border: 1px solid var(--signup-input);
    background-color: #eeeeee;
  }

  .ql-container {
    border: 1px solid var(--signup-input);
    height: 500px;
  }
`;
