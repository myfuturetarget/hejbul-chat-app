import React, { useReducer } from 'react';
import { useAuth } from './AuthContext';

export const ChatContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const ChatsContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const initialValue = {
    chatId: 'null',
    user: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change_user':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
