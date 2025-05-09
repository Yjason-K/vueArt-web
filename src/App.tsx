import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout.tsx';
import { LoginLayout } from '@components/layout/LoaingLayout';
import { lazy, Suspense } from 'react';
import { CenterSpinner } from './components/spinner/Centerspinner';
import MyPage from '@/pages/mypage/MyPage';

const Login = lazy(() => import('@/pages/login/Login'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CenterSpinner />}>
        <Routes>
          {/* 메인 레이아웃 */}
          <Route element={<MainLayout />}></Route>
          {/* 로그인 라우터 */}
          <Route element={<LoginLayout />}>
            <Route path={'/login'} element={<Login />} />
            {/* <Route path={'/signup'} element={<Signup />} /> */}
            {/* <Route path={'/find-password'} element={<FindPassword />} /> */}
          </Route>
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
