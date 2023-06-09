import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { fetchSuccess, fetchStart, fetchFailure } from "../redux/videoSlice";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  border-radius: ${(props) => (props.type === "sm" ? "5px" : "8px")};
  z-index: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  display: ${(props) => props.type === "sm" && "flex"};
`;

const Title = styled.h1`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  flex: ${(props) => props.type === "sm" && 2};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  flex: ${(props) => props.type === "sm" && 1};
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  flex: ${(props) => props.type === "sm" && 1};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/api/users/find/${video.userId}`);
      setChannel(res.data.user);
    };
    fetchChannel();
  }, [video.userId]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = async (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    const res = await axios.get(
      `/api/videos/${video._id}`
    );
    if (res.data.success) {
      dispatch(fetchSuccess(res.data.video));
      try {
        await axios.put(`/api/videos/view/${res.data.video._id}`);
      } catch (err) {}
      navigate(`/video/${video._id}`);
    } else {
      dispatch(fetchFailure());
    }
  };

  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none" }}
      onClick={(e) => clickHandler(e)}
    >
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.image} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
