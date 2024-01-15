import { useState } from 'react';
import Chat from '../components/Chat';
import Sideber from '../components/Sideber';
// import Register from './register';

// import Login from './Login';

const home = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [back, setBack] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [forword, setForwoed] = useState(false);

  const backHandle = () => {
    setBack(true);
    setForwoed(false);
  };

  const forwordHandle = () => {
    setForwoed(true);
    setBack(false);
  };

  return (
    <div className=" max-sm:flex-none w-full flex justify-center items-endpt-10">
      <div className=" max-sm:hidden circle rounded-full "></div>
      <div className=" max-sm:hidden circle rounded-full absolute top-60 right-28"></div>
      <div className=" max-sm:hidden circle rounded-full absolute -top-14 left-3"></div>
      {/* <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div> */}
      <div className=" absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 shadow-xl w-[65%] h-[80%] max-2xl:w-[85%] max-xl:w-[90%] max-lg:w-[95%] flex max-sm:w-[100%] max-sm:h-svh">
        <Sideber forwordHandle={forwordHandle} forword={forword} />
        <Chat backHandle={backHandle} back={back} />
      </div>
      {/* <Register /> */}
      {/* <Login /> */}
    </div>
  );
};

export default home;
