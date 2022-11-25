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
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useLocalStorage("currentUser");
  
  // const a = () => {
  //         useLocalStoraga("currentUser", userInfo);
  //   }
  console.log("{}{}{}{}{}}");

useEffect(() => {
      // const access_token = queryParams.get('accessToken');
      const access_token  = searchParams.get("accessToken");
      if (access_token)
      { 
        console.log("aaaaaaa");
        // localStorage.setItem(keyPrefix, JSON.stringify(value));
        localStorage.setItem('accessToken', access_token);

        
        getCurrentUser().then((res) => {
          console.log(res);
          setUserInfo(res);
          localStorage.setItem("currentUser", res);
          toast.success("You login success !!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(err => console.log(err))
        navigate("/channels");
      } else {
        alert('received invalid access token')
      }
    }, [])



    
  return (
    <>
    </>
  );
}

