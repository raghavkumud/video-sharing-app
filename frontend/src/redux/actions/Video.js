import axios from "axios";

export const loadCurrentVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: "fetchStart",
    });
    const res = await axios.get(`http://localhost:8800/api/videos/${videoId}`);
    console.log({ res });
    dispatch({
      type: "fetchSuccess",
      payload: res.data.video,
    });
  } catch (err) {
    dispatch({
      type: "fetchFailure",
    });
  }
};
