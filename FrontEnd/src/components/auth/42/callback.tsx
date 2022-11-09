// import { useRouter } from "next/router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Callback() {
//   const router = useRouter();
const navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search)
    // const access_token = queryParams.get('accessToken');
    const access_token  = searchParams.get("accessToken");
    if (access_token)
    {
      localStorage.setItem('accessToken', access_token);
      // ! get User connected -> check if tfa is enabled ( yes ? navigate to /tfa : navigate /channels)
    //   router.push('/channels');
     navigate("/channels");
    } else {
      //TODO: display error for receiving invalid access_token
      alert('received invalid access token')
    }
  })

  return (
    <>
    </>
  );
}
