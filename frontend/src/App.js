import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import ShortMenu from "./components/ShortMenu";
import { connect } from "react-redux";

import "./App.css";
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  flex: 14;
  background-color: ${({ theme }) => theme.bg};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  margin-top: 60px;

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #505050;
    border-radius: 10px;
    height: 10%;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888888;
  }
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;
const mapThemeState = (state) => {
  if (state.user.theme.darkMode) {
    return { theme: darkTheme };
  } else {
    return { theme: lightTheme };
  }
};
const ConnectedThemeProvider = connect(mapThemeState)(ThemeProvider);
function App() {
  const { darkMode } = useSelector((state) => state.user.theme.darkMode);
  const { currentUser } = useSelector((state) => state.user);
  const [shrinkMenu, setShrinkMenu] = useState(false);
  return (
    <ConnectedThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar setShrinkMenu={setShrinkMenu} shrinkMenu={shrinkMenu} />
          {shrinkMenu ? (
            <ShortMenu darkMode={darkMode} />
          ) : (
            <Menu darkMode={darkMode} />
          )}
          <Main>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trend" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ConnectedThemeProvider>
  );
}

export default connect(mapThemeState)(App);
