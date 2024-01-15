import Login from './components/Small Project/ForProject3/pages/Login';
import Home from './components/Small Project/ForProject3/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Small Project/ForProject3/Hooks/AuthContext';
import RedirectPage1 from '../src/components/Small Project/ForProject3/components/RedirectPage1';
import RedirectPage2 from '../src/components/Small Project/ForProject3/components/RedirectPage2';
import { ChatsContextProvider } from './components/Small Project/ForProject3/Hooks/ChatContext';
import Register from './components/Small Project/ForProject3/pages/Register';
const App = () => {
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

export default App;
