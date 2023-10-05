import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';

interface ToastEditorProps {
  onContentChange: (content: string) => void;
}

const ToastEditor = ({ onContentChange }: ToastEditorProps) => {
  const editorRef = useRef<Editor>(null);

  // Editor 내용 변경 시 호출되는 콜백 함수
  const handleContentChange = () => {
    const value = editorRef.current?.getInstance().getMarkdown();
    onContentChange(value); // WriteReview로 전달
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    ['scrollSync'],
  ];

  return (
    <>
      <Editor
        ref={editorRef}
        width="100%"
        height="600px"
        initialValue=" "
        initialEditType="wysiwyg"
        previewStyle="vertical"
        usageStatistics={false}
        hideModeSwitch={true}
        toobarItems={toolbarItems}
        useCommandShortcut={false}
        onChange={handleContentChange}
      />
    </>
  );
};

export default ToastEditor;
