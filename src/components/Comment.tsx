import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Comment = () => {
  return (
    <CommentContainer>
      <CommentConTitle>댓글</CommentConTitle>

      <CommentForm>
        <CommentBox placeholder="댓글을 입력해주세요." spellCheck="false" />
        <RegisterBtn type="submit" value="등록" />
      </CommentForm>

      <CommentListsUl>
        <CommentLi>
          <CommentInfo>
            <UserInfo>
              <ProfilePhoto
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="프로필사진"
                width="36px"
                height="36px"
              />
              <Nickname>닉네임</Nickname>
              <Date>작성일</Date>
            </UserInfo>
            <BtnsContainer>
              <DotsIconWrapper>
                <DotsIcon icon={faEllipsisVertical} />
              </DotsIconWrapper>
              <BtnsWrapperUl>
                <EditBtn>수정</EditBtn>
                <DeleteBtn>삭제</DeleteBtn>
              </BtnsWrapperUl>
            </BtnsContainer>
          </CommentInfo>
          <CommentText>댓글 내용</CommentText>
        </CommentLi>
      </CommentListsUl>
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

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.textarea`
  width: 90%;
  height: 55px;
  padding: 10px;
  outline: none;
  border-radius: var(--border-raidus);
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
  border-radius: var(--border-raidus);

  &:hover {
    cursor: pointer;
  }
`;

const CommentListsUl = styled.ul`
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
  border-radius: var(--border-raidus);
  background-color: var(--white-color);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.09);
  display: none;

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
