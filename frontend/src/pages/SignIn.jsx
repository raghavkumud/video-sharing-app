import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding-top: 100px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const ProfilePicture = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: fill;
  background-image: url(${(props) => props.imageSrc});
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    color: white;
    background-color: green;
    cursor: pointer;
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SuccessText = styled.p`
  color: green;
`;
const ErrorText = styled.p`
  color: red;
`;
const SignIn = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/auth/signin", { name, password });
      dispatch(loginSuccess(res.data.user));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const register = async (e) => {
    e.preventDefault();
    const userData = { name, image, password, email };
    const res = await axios.post(
      `/api/auth/signup`,
      userData
    );
    if (res.data.success) {
      setSuccess("You have registered successfully");
    }
    if (!res.data.success) {
      setError("Some error occurred");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VidTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        {image && <ProfilePicture imageSrc={image}> </ProfilePicture>}
        {!image && <AccountCircleIcon style={{ fontSize: 120 }} />}
        <Input
          placeholder="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={register}>Sign up</Button>
        <SuccessText>{success}</SuccessText>
        <ErrorText>{error}</ErrorText>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
