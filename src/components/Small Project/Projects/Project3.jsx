import '../../../assets/css/project3.css';
import Login from '../ForProject3/pages/Login';
import Home from '../ForProject3/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './../ForProject3/pages/register';
import { AuthProvider } from '../ForProject3/Hooks/AuthContext';
import RedirectPage1 from '../ForProject3/components/RedirectPage1';
import RedirectPage2 from '../ForProject3/components/RedirectPage2';
import { ChatsContextProvider } from '../ForProject3/Hooks/ChatContext';
const Project3 = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ChatsContextProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <RedirectPage2>
                    <Home />
                  </RedirectPage2>
                }
              />
              <Route
                exact
                path="login"
                element={
                  <RedirectPage1>
                    <Login />
                  </RedirectPage1>
                }
              />
              <Route
                exact
                path="/register"
                element={
                  <RedirectPage1>
                    <Register />
                  </RedirectPage1>
                }
              />
            </Routes>
          </ChatsContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default Project3;
