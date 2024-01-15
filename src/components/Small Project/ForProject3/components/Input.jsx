import { useContext, useState } from 'react';
import { useAuth } from '../Hooks/AuthContext';
import { ChatContext } from '../Hooks/ChatContext';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const { currentUser } = useAuth();
  const { data } = useContext(ChatContext);

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const handleSent = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    setText('');
    setImg(null);
  };

  return (
    <div className=" w-full bg-white flex justify-between items-center p-[19px]">
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        type="text"
        className=" w-[85%] p-2 outline-none"
        placeholder="Message..."
      />
      <div className=" flex items-center justify-between gap-10">
        <i
          onClick={handleSent}
          className="fa-solid fa-paper-plane cursor-pointer text-red-300 text-xl hover:text-red-400"
        ></i>
        <div className=" flex justify-between items-center gap-5">
          <i className="fa-solid fa-paperclip cursor-pointer text-red-300 hover:text-red-400"></i>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            onChange={e => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <i className="fa-solid fa-image cursor-pointer text-red-300 hover:text-red-400"></i>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Input;
