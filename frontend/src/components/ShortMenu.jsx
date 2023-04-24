import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin-top: 60px;
`;
const Wrapper = styled.div`
  padding: 18px 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 4px 0px;
  margin: 22px 0px;
  flex-direction: column;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Text = styled.div`
  font-size: 10px;
  text-align: center;
`;

const ShortMenu = ({ darkMode, setDarkMode }) => {
  return (
    <Container>
      <Wrapper>
        <Item>
          <HomeIcon />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Text>Home</Text>
          </Link>
        </Item>
        <Link to="trend" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            <Text>Explore</Text>
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            <Text>Subscriptions</Text>
          </Item>
        </Link>
        <Item>
          <VideoLibraryOutlinedIcon />
          <Text>Library</Text>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default ShortMenu;
