import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext';

// eslint-disable-next-line react/prop-types
const RedirectPage1 = ({ children }) => {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  return !currentUser ? children : <Navigate to="/" />;
};

export default RedirectPage1;
