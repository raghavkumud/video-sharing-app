import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAlert } from "react-alert";
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  &:focus {
    border-bottom: 1px solid black;
  }
`;
const Button = styled.button`
  border: none;
  border-radius: 10%;
  padding: 5px 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
`;
const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const alert = useAlert();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        console.log({
          m: "in comment",
          res,
        });
        setComments(res.data.comments);
        console.log(comments);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const commentHandler = async () => {
    const data = { desc: comment };
    const res = await axios.post(`/comments/${videoId}`, data);
    console.log({ res });
    if (res.data.success) {
      setComments(res.data.comments);
      setComment("");
    } else {
      alert.error("Some Error Occurred");
    }
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <Container>
      <NewComment>
        {currentUser && <Avatar src={currentUser.image} />}
        {!currentUser && <AccountCircleIcon style={{ fontSize: 40 }} />}
        <Input
          id="tx"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </NewComment>
      {comment && (
        <ButtonWrapper>
          <Button onClick={commentHandler}>Comment</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </ButtonWrapper>
      )}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
