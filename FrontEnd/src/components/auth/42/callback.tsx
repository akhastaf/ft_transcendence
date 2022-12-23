// import { useRouter } from "next/router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../../Services/user";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../Services/auth";


export default function Callback() {
  //   const router = useRouter();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  let auth = useAuth();
  // eslint-disable-next-line
  const [errordata, seterrordata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useLocalStorage("currentUser");
  
 
useEffect(() => {
      // const access_token = queryParams.get('accessToken');
      const access_token  = searchParams.get("accessToken");
      const twfa = searchParams.get("twfa");
      if (twfa)
      {
        
      }
      if (access_token)
      { 
        console.log("aaaaaaa");
        // localStorage.setItem(keyPrefix, JSON.stringify(value));
        localStorage.setItem('accessToken', access_token);

        
        getCurrentUser().then((res) => {
          console.log(res);
          setUserInfo(res);
          localStorage.setItem("currentUser", JSON.stringify(res));
          toast.success("You login success !!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(err => console.log(err))
        navigate("/channels");
      }
    }, [])



    
  return (
    <>
      {
        showModal && <>  <div
        aria-hidden={true}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[#222] bg-opacity-50"
        // onClick={closeModal}
      >
        <div className="relative p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
          <div className="relative bg-white rounded-lg shadow">
           
      </div>
      </div>
        </div>
      </>
      }
    </>
  );
}

