
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


function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
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
                    <Route path="/members/:memberId" element={<ProfilePage />} />
                    <Route path="/meme/create" element={<MemeCreatePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
          </AuthProvider>

      </BrowserRouter>

  );
}

export default App;
