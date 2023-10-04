import styled from '@emotion/styled';

interface CommentProps {
  children: React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({ children }) => {
  return (
    <CommentContainer>
      <CommentConTitle>댓글</CommentConTitle>
      <ul>{children}</ul>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  width: 1200px;
  margin-top: 30px;
`;

const CommentConTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 22px;
`;
