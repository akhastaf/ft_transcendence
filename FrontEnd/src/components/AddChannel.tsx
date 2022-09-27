// import React, {useRef} from 'react';
import React , {useState} from 'react';
import {IoCloseCircleSharp} from "react-icons/io5";
const formImage = require('../images/form.gif');

const logo = require('../images/ponglogo.png');

interface ChildProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  }


  
function AddChannel({setShowModal} : ChildProps) {
      const [privacy, setPrivacy] = useState("public");

    console.log(setShowModal);
    // const modalRef = useRef();
  const closeModal = () => {
   
      setShowModal(false);

  };



  const showdiv = (event : React.ChangeEvent<HTMLSelectElement>) => {

    setPrivacy(event.target.value);
    // console.log(event.target.value);
  }

  return (

   <>
        
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={ () => {closeModal();}}
          >
            <div className="flex items-center" onClick={e => {e.stopPropagation();}} >
                <div className="grow invisible lg:visible">
                <img className="lg:visible w-0 lg:w-[35rem] lg:h-[46rem] lg:rounded-l-lg" src={formImage}
              alt="img" />
            </div>
            <div className="w-auto my-6 mx-auto h-[46rem] max-w-3xl" >
              {/*content*/}
              <div className="border-0 rounded-lg lg:rounded-r-lg  h-[46rem] shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none" onClick={e => {e.stopPropagation();}}>
                {/*header*/}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <button
                    className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                  >
                   <IoCloseCircleSharp className="text-emerald-400" />
                  </button>
    <img className="mx-auto h-40 w-auto" src={logo} alt="Workflow" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w">
      Already registered?
      <a href="/#" className="font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500">Sign in</a>
    </p>
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow  rounded lg:rounded-r-lg sm:px-10 h-full">
      <form className="mb-0 space-y-6" action="addchannel" method="POST">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">Channel Name</label>
          <div className="mt-1">
            <input id="channelName" name="channelName" type="text"  required className="" />
          </div>
        </div>

          
        <div>
          <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">Channel Privacy</label>
          <div className="mt-1">
             <select name="company-size" id="company-size" className="" onChange={showdiv}>
             {/* <select name="company-size" id="company-size" className="" onChange={event => {console.log(event.target.value); }}> */}
              <option value="">Please select</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Protected">Protected</option>
            </select>
          </div>
        </div>
        {
          privacy === "Protected" || privacy === "Private" ? 
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input id="password" name="password" type="password"  required className="" />
            </div>
          </div> : null
        }

    <div className="mt-1">
            <label htmlFor="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*"/>
      </div>

        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Sign up</button>
        </div>
      </form>
    </div>
      </div>
    </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default AddChannel