import { Route, Routes} from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import {AuthProvider} from "./app/AuthContext.jsx";
import PrivateRoute from "./app/PrivateRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className='h-100'>
        <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
      </div>
    </AuthProvider>

  )
};

export default App;