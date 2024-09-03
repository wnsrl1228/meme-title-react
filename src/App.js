
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemeViewPage from './pages/MemeViewPage';
import TitleViewPage from './pages/TitleViewPage';
import LoginPage from './pages/LoingPage';
import RedirectionPage from './pages/RedirectionPage';
import { AuthProvider } from './hooks/AuthProvider';
import TitleCreatePage from './pages/TitleCreatePage';
import MyPage from './pages/MyPage';
import RankingPage from './pages/RankingPage';
import ProfilePage from './pages/ProfilePage';
import ScrollToTop from './util/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';
import MemeCreatePage from './pages/MemeCreatePage';
import ChatRoomsPage from './pages/ChatRoomsPage';
import ChatViewPage from './pages/ChatViewPage';
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이를 설정 */
`;

const MainContent = styled.main`
  flex: 1; /* 페이지 콘텐츠가 footer 위로 확장되도록 설정 */
`;

function App() {
  return (
      <BrowserRouter>
            <AuthProvider>
                <AppContainer>
                    <MainContent>
                        {/* 페이지의 주요 콘텐츠를 여기에 넣으세요 */}
                        
                    <Navbar/>
                    <ScrollToTop />
                    <Routes>
                    <Route index element={<MainPage/>} />
                    <Route path="memes/:memeId" element={<MemeViewPage/>} />
                    <Route path="memes/:memeId/titles/:titleId" element={<TitleViewPage/>} />
                    <Route path="login" element={<LoginPage/>} />
                    <Route path='/login/kakao' element={<RedirectionPage />} />
                    <Route path="/memes/:memeId/titles/create" element={<TitleCreatePage />} />
                    <Route path="/member/mypage" element={<MyPage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/chat/rooms" element={<ChatRoomsPage />} />
                    <Route path="/chat/rooms/:roomId" element={<ChatViewPage />} />
                    <Route path="/members/:memberId" element={<ProfilePage />} />
                    <Route path="/meme/create" element={<MemeCreatePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </MainContent>
                    <Footer />
                </AppContainer>
            </AuthProvider>

      </BrowserRouter>

  );
}

export default App;
