import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import PrivateRoute from "./app/PrivateRoute.jsx";
import { Provider, ErrorBoundary } from '@rollbar/react';
import {rollbar} from "./services/rollbar.js";

const App = () => {
  return (
    <Provider instance={rollbar}>
      <ErrorBoundary>
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;