import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

import {
  logOutFailure,
  logOutRequest,
  logoutSuccess,
} from "../redux/userSlice";
import VidTube from "../img/logo.png";

const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  width: 100%;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0px 20px;
  position: relative;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  gap: 25px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  margin: 0;
  height: 28px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  gap: 5px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  background-color: transparent;
  outline: none;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  color: ${({ theme }) => theme.text};
  padding: 10px;
  width: 600px;
  height: 40px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #999;
  border: 1px solid gainsboro;
  &: hover {
    cursor: pointer;
  }
`;
const MenuIconDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const CircleBackground = styled.div`
  border-radius: 50%;
  padding: 10px;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;
const BlockDiv = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const SearchOutlinedIconDiv = styled.div`
  background-color: $(({theme}) => theme.bg);
  width: 80px;
  height: 40px;
  margin: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  &:hover {
    background-color: $(({theme}) => theme.soft);
  }
`;
const UserCard = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  position: fixed;
  z-index: 20;
  right: 60px;
  top: 50px;
  background-color: white;
  padding: 20px 0px;
  border-radius: 5px
  font-weight: 500;
`;
const Title = styled.p`
  margin: 0px;
  text-align: center;
`;

const UserCardItem = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 15px;
  &: hover {
    background-color: #e8e8e8;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const Navbar = ({ setShrinkMenu, shrinkMenu }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showLogOutCard, setShowLogOutCard] = useState(false);
  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(logOutRequest());
      const res = await axios.delete("/auth/logOut");
      console.log(res);
      if (res.data.success) {
        dispatch(logoutSuccess());
        localStorage.delete("persist:root");
      } else {
        dispatch(logOutFailure());
      }
    } catch (err) {
      dispatch(logOutFailure());
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <MenuIconDiv>
            <CircleBackground onClick={() => setShrinkMenu(!shrinkMenu)}>
              <MenuIcon style={{ fontSize: 30 }} />
            </CircleBackground>
            <BlockDiv>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Logo>
                  <Img src={VidTube} />
                  <Title>VidTube</Title>
                </Logo>
              </Link>
            </BlockDiv>
          </MenuIconDiv>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIconDiv>
              <BlockDiv>
                <SearchOutlinedIcon
                  style={{ width: 25 }}
                  onClick={() => navigate(`/search?q=${q}`)}
                />
              </BlockDiv>
            </SearchOutlinedIconDiv>
          </Search>
          {currentUser ? (
            <Wrapper>
              <VideoCallOutlinedIcon
                style={{ fontSize: 30 }}
                onClick={() => setOpen(true)}
              />
              <NotificationsNoneIcon style={{ fontSize: 30 }} />
              <Avatar
                onClick={() => setShowLogOutCard(!showLogOutCard)}
                src={currentUser.image}
              />
              {showLogOutCard && (
                <UserCard>
                  <UserCardItem>
                    <LogoutSharpIcon />
                    <BlockDiv onClick={logOutHandler}>LogOut</BlockDiv>
                  </UserCardItem>
                </UserCard>
              )}
            </Wrapper>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
