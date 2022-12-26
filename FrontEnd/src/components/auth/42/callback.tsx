// import { useRouter } from "next/router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../../Services/user";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../Services/auth";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { localService } from "../../../api/axios";


export default function Callback() {
  //   const router = useRouter();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  let auth = useAuth();
  // eslint-disable-next-line
  const [errordata, seterrordata] = useState(false);
  const [showModal, setShowModal] = useState(true);
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useLocalStorage("currentUser");
  
  const id_user = searchParams.get("user_id");
  const a : number = (id_user) ? parseInt(id_user) : 0;
  const [at, setAt] = useState<any>()
 
useEffect(() => {
      // const access_token = queryParams.get('accessToken');
      const access_token  = searchParams.get("accessToken");
      const twfa = searchParams.get("twfa");
      if (twfa)
      {
        console.log("heelo i am tfa" , at );
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

    const { register, handleSubmit, setError, formState: { errors } } = useForm<{token : string} >();
    const submitForm : SubmitHandler<{token : string}>= (data) => {
      const name = data.token ? data.token : "9999";
     const retur =  localService.post("auth/2fa/", {token : name, id : a}).then((res) => 
        
            {
                setAt(res.data);
                localStorage.setItem('accessToken', res.data.access_token);
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
                console.log("enabled ,", res.data);
            })
            console.log("hello ", retur);
    }
    
  return (
    <>

    <div
                className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
               
            >
                <div className="flex items-center "  >
                    {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
                        <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
                        <form className="w-full h-full" onSubmit={handleSubmit(submitForm)}>
                            <Flex  h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                            <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                                
                                <h2 className="text-center text-xl font-bold text-white">Two Factor Authentification </h2>
                            </Flex>
                                <label htmlFor="newUserName">Enter CODE : </label>
                                         <input  className="text-black px-10" {...register("token")}  type="text"  />
                            
                            <Flex w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-end"} alignItems={"center"} bg={"#2f3136"}>
                            <ButtonGroup pr={"3%"}>
                                      
                                        <Button  colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
                                    </ButtonGroup>
                            </Flex>
                            </Flex>
                            </form>
                        </Flex>
    
                    {/* </div> */}
                </div>
            </div>
            <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
  );
}

