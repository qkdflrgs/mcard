import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import ScrollToTop from '@common/ScrollToTop'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import Navbar from '@common/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'
import ApplyPage from '@pages/Apply'
import ApplyDonePage from '@pages/ApplyDone'
import { Suspense } from 'react'
import MyPage from '@pages/My'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDonePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
