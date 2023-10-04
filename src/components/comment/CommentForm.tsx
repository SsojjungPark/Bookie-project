import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const CommentForm = () => {
  const { currentUser } = useAuth();
  const { category } = useParams();
  const { id: reviewId } = useParams();

  const [commentContent, setCommentContent] = useState<string>('');
  const [commentNickname, setCommentNickname] = useState<string>('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentContent(value);

    console.log(value);
  };

  useEffect(() => {
    const fetchUserNickname = async () => {
      if (currentUser) {
        try {
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('uid', '==', currentUser.uid));
          const querySnaptshot = await getDocs(q);

          const currentUserNickname = querySnaptshot.docs[0].data().nickname;

          setCommentNickname(currentUserNickname);
          setIsUserLoggedIn(true);
        } catch (error) {
          console.log('fetchUserNickname 실패: ', error);
        }
      }
    };

    fetchUserNickname();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로그인한 경우에만 댓글 저장
    if (isUserLoggedIn) {
      // 날짜 "0000-00-00"형태로 변경
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // 댓글 저장
      try {
        const commentRef = doc(collection(db, `${category}`, `${reviewId}`, 'comments'));
        await setDoc(commentRef, {
          comment: commentContent,
          commentDate: formattedDate,
          commentWriter: commentNickname,
          uid: currentUser?.uid,
        });

        setCommentContent(''); // 등록후 댓글창 초기화
        console.log('댓글 저장 성공');
      } catch (error) {
        console.log('댓글 저장 실패: ', error);
      }
    } else {
      alert('댓글 작성을 위해서는 로그인이 필요합니다.');
    }
  };

  return (
    <CommentFormLi>
      <Form onSubmit={handleSubmit}>
        <CommentBox
          placeholder="댓글을 입력해주세요."
          spellCheck="false"
          onChange={handleChange}
          value={commentContent}
        />
        <RegisterBtn type="submit" value="등록" />
      </Form>
    </CommentFormLi>
  );
};

export default CommentForm;

const CommentFormLi = styled.li``;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.textarea`
  width: 90%;
  height: 55px;
  padding: 10px;
  outline: none;
  border-radius: var(--border-radius);
  border: 1px solid var(--signup-input);
  resize: none;
  font-size: 13px;
  line-height: 20px;
  color: var(--black-color);

  &:focus {
    border: 2px solid var(--signup-input);
  }

  &::placeholder {
    font-size: 14px;
    letter-spacing: -2px;
    color: var(--placehodler-gray);
  }
`;

const RegisterBtn = styled.input`
  width: 74px;
  background-color: var(--light-brown);
  font-weight: 500;
  font-size: 14px;
  color: var(--white-color);
  border: none;
  border-radius: var(--border-radius);

  &:hover {
    cursor: pointer;
  }
`;
