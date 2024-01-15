import { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { ChatContext } from '../Hooks/ChatContext';

const Messages = () => {
  const [messages, setMssages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
      doc.exists() && setMssages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  console.log(messages);
  return (
    <div className=" h-lvh bg-red-50 overflow-y-auto">
      <div className=" text-center w-[70%] mx-auto mt-5 mb-10">
        <img
          src={data.user.photoURL}
          alt="demo top image"
          className=" h-11 w-11 rounded-full border object-cover mx-auto"
        />
        <h1 className=" text-xl font-bold">{data.user.displayName}</h1>
        <p className=" text-sm text-zinc-500">
          You can message to {data.user.displayName} now.
        </p>
        <p className=" text-sm text-zinc-600">
          <span className=" text-lg font-bold">Note:</span> You can't upload
          video file and can't give call. You can just sent message. Because, It
          had builded just practic purpose.
        </p>
      </div>
      {messages.map(m => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  );
};

export default Messages;
