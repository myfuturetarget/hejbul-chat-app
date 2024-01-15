import { useState } from 'react';
import manImg from '../../../../assets/img/try1.png';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useAuth } from '../Hooks/AuthContext';

const Search = () => {
  const [username, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useAuth();

  const handleSearchFunc = async () => {
    const citiesRef = collection(db, 'users');
    const q = query(citiesRef, where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      setErr(err);
    }
    setUserName('');
  };

  const conversationFunc = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
      }

      // update userChats for currentUser
      await updateOrCreateUserChat(currentUser.uid, combinedId, user);

      // update userChats for the other user
      await updateOrCreateUserChat(user.uid, combinedId, currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrCreateUserChat = async (uid, combinedId, otherUser) => {
    try {
      const userChatsDoc = doc(db, 'userChats', uid);
      const userChatsSnapshot = await getDoc(userChatsDoc);

      if (!userChatsSnapshot.exists()) {
        await setDoc(userChatsDoc, {});
      }

      await updateDoc(userChatsDoc, {
        [combinedId + '.userInfo']: {
          uid: otherUser.uid,
          displayName: otherUser.displayName,
          photoURL: otherUser.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    setUser(null);
  };

  // const conversationFunc = async () => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, 'chats', combinedId));

  //     if (!res.exists()) {
  //       // create a chat in chats collection
  //       await setDoc(doc(db, 'chats', combinedId), { messages: [] });

  //       // create a user
  //       await updateDoc(doc(db, 'userChats', currentUser.uid), {
  //         [combinedId + '.userInfo']: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         },
  //         [combinedId + '.date']: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, 'userChats', user.uid), {
  //         [combinedId + '.userInfo']: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + '.date']: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <div className=" bg-white flex justify-between items-center">
        <input
          value={username}
          onChange={e => setUserName(e.target.value)}
          type="text"
          className=" outline-none p-2 w-full"
          placeholder="Search a user..."
        />
        <i
          onClick={handleSearchFunc}
          className="fa-solid fa-magnifying-glass cursor-pointer p-3"
        ></i>
      </div>
      {err && <p className=" text-center text-red-600">User not found</p>}
      {user && (
        <div
          onClick={conversationFunc}
          className=" w-full flex items-center cursor-pointer hover:bg-red-200 p-2"
        >
          <img
            src={user ? user.photoURL : manImg}
            alt="Chat user image"
            className=" w-10 h-10 mr-2 rounded-full object-cover"
          />
          <div>
            <span className=" text-sm">
              {user ? user.displayName : 'unkown'}
            </span>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Search;
