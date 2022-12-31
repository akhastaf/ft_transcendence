import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


import { getCurrentUser } from "../../Services/user";

// import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Flex, Text, Link } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { localService } from "../../../api/axios";
import {  SocketContext } from "../../Services/sockets";
import { useAuthq } from "../../../App";



export default function Callback() {
  //   const router = useRouter();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();


  // eslint-disable-next-line
  // const [userInfo, setUserInfo] = useLocalStorage("currentUser");
  
  const id_user = searchParams.get("user_id");
  const a: number = (id_user) ? parseInt(id_user) : 0;
  const { token, setToken } = useAuthq();
  const r = useContext(SocketContext);
  console.log("socker = ", r);
  
  // eslint-disable-next-line
  const [at, setAt] = useState<any>()
  
  // eslint-disable-next-line
  const access_token = searchParams.get("accessToken");
  const twfa = searchParams.get("twofa");
  const newU = searchParams.get("newlog");
  useEffect(() => {
    // const access_token = queryParams.get('accessToken');
    r.auth = { token: access_token };
    if (twfa) {
      // console.log("heelo i am tfa", at);
      setAt(true);
    }
    if (access_token) {

      localStorage.setItem('accessToken', access_token);
      setToken(access_token);
      console.log(" all done");
      
      getCurrentUser().then((res) => {
        console.log(res);
        // setUserInfo(res);
        localStorage.setItem("currentUser", JSON.stringify(res));
        navigate(`/channels?new=${newU}`);
      
      })
      .catch(err => console.log(err))

    } 
  },[r, setToken,  searchParams, access_token, newU,twfa])


  const [reset, setReset] = useState(false);
  const { register, handleSubmit } = useForm<{ token: string }>();
  const submitForm: SubmitHandler<{ token: string }> = (data) => {
    const name = data.token ? data.token : "9999";
    if (!reset)
    {
    const retur = localService.post("auth/2fa/", { token: name, id: a }).then((res) => {
      setAt(res.data);
      localStorage.setItem('accessToken', res.data.access_token);
      getCurrentUser().then((res) => {
        console.log(res);
        // setUserInfo(res); 
        localStorage.setItem("currentUser", JSON.stringify(res));
        toast.success("You login success !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
        .catch(err => console.log(err))
      navigate("/channels");
      console.log("enabled ,", res.data);
    })
    console.log("hello ", retur);
  }
  else
  {
    localService.post("/auth/2fa/reset", {recovery_code : token, id : a}).then ((res) => {
      setAt(res.data);
      localStorage.setItem('accessToken', res.data.access_token);
      getCurrentUser().then((res) => {
        console.log(res);
        // setUserInfo(res);
        localStorage.setItem("currentUser", JSON.stringify(res));
        toast.success("You login success !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
        .catch(err => console.log(err))
      navigate('/channels');
      console.log("enabled ,", res.data);

    })
  }
}

  return (
    <>
    {at &&<>
      <div
        className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"

      >
        <div className="flex items-center "  >
          {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
          <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
            <form className="w-full h-full" onSubmit={handleSubmit(submitForm)}>
              <Flex h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>

                  <h2 className="text-center text-xl font-bold text-white">Two Factor Authentification </h2>
                </Flex>
                {
              !reset ?  <>
                <label htmlFor="newUserName">Enter CODE : </label>
                <input className="text-black px-10" {...register("token", { required: true })} type="text" />
                </> : <>   <label htmlFor="newUserName">Enter the code Given when Set the 2FA : </label>
                <input className="text-black px-10" {...register("token", { required: true })} type="text" /></>
                }

                <Flex  gap={"100px"} w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-start"} alignItems={"center"} bg={"#2f3136"}>
                  <Text>
                    <Link color='teal.500'  onClick={ () => setReset(true)}>
                    Reset TWO Factor Auth 
                    </Link>
                  </Text>
                  <ButtonGroup pr={"3%"}>

                    <Button colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
                  </ButtonGroup>
                </Flex>
              </Flex>
            </form>
          </Flex>

          {/* </div> */}
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
             </> }
    </>
  );
}

