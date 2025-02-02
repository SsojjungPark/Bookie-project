import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

interface CommentData {
  commentNickname: string;
  commentDate: string;
  commentContent: string;
  writerUid: string;
  commentId: string;
}

interface CommentCountProps {
  onCommentCountChange: (count: number) => void;
}

const CommentList: React.FC<CommentCountProps> = ({ onCommentCountChange }) => {
  const { currentUser } = useAuth();
  const { category } = useParams();
  const { id: reviewId } = useParams();

  const [comments, setComments] = useState<CommentData[]>([]);
  const [visibleCommentId, setVisibleCommentId] = useState<string | null>(null);

  useEffect(() => {
    const commentsCollection = query(collection(db, `${category}`, `${reviewId}`, 'comments'));
    const unsubscribe = onSnapshot(commentsCollection, (querySnapshot) => {
      const CommentData = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          commentNickname: data.commentWriter,
          commentDate: data.commentDate,
          commentContent: data.comment,
          writerUid: data.uid,
          commentId: doc.id,
        };
      });

      CommentData.sort((a, b) => b.commentDate.localeCompare(a.commentDate));

      setComments(CommentData);

      const commentCount = CommentData.length;
      onCommentCountChange(commentCount);
    });

    return () => unsubscribe();
  }, [category, reviewId, onCommentCountChange]);

  const toggleCommentToolBtn = (commentId: string) => {
    const commentToToggle = comments.find((comment) => comment.commentId === commentId);

    if (currentUser && commentToToggle && currentUser.uid === commentToToggle.writerUid) {
      if (visibleCommentId === commentId) {
        setVisibleCommentId(null);
      } else {
        setVisibleCommentId(commentId);
      }
    }
  };

  return (
    <CommentRowUl>
      {comments.map((comment) => (
        <CommentLi key={comment.commentId}>
          <CommentInfo>
            <UserInfo>
              <ProfilePhoto
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="프로필사진"
                width="36px"
                height="36px"
              />
              <Nickname>{comment.commentNickname}</Nickname>
              <Date>{comment.commentDate}</Date>
            </UserInfo>
            {currentUser && currentUser.uid === comment.writerUid && (
              <BtnsContainer>
                <DotsIconWrapper onClick={() => toggleCommentToolBtn(comment.commentId)}>
                  <DotsIcon icon={faEllipsisVertical} />
                </DotsIconWrapper>
                {visibleCommentId === comment.commentId && (
                  <BtnsWrapperUl>
                    <EditBtn>수정</EditBtn>
                    <DeleteBtn>삭제</DeleteBtn>
                  </BtnsWrapperUl>
                )}
              </BtnsContainer>
            )}
          </CommentInfo>
          <CommentText>{comment.commentContent}</CommentText>
        </CommentLi>
      ))}
    </CommentRowUl>
  );
};

export default CommentList;

const CommentRowUl = styled.ul`
  width: 100%;
`;

const CommentLi = styled.li`
  margin-top: 50px;
  min-height: 100px;
`;

const CommentInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  border: 1px solid var(--singup-input);
  object-fit: cover;
  margin-right: 18px;
`;

const Nickname = styled.span`
  margin-right: 10px;
  font-weight: 500;
`;

const Date = styled.span``;

const BtnsContainer = styled.div``;

const DotsIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;

  &: hover {
    cursor: pointer;
  }
`;

const DotsIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: var(--signup-input);
`;

const BtnsWrapperUl = styled.ul`
  position: absolute;
  right: 0;
  width: 100px;
  padding-top: 5px;
  border-radius: var(--border-radius);
  background-color: var(--white-color);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.09);

  li {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 15px;
    margin-bottom: 5px;
    font-size: 13px;
    text-align: center;
  }

  li: hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: #f5f6f8;
  }
`;

const EditBtn = styled.li``;

const DeleteBtn = styled.li``;

const CommentText = styled.div`
  padding: 0 55px;
  margin-top: 20px;
  font-size: 15px;
  color: var(--black-color);
`;
