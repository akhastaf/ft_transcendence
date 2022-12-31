
import './App.css';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Welcome from './components/Welcome/Welcome';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  // Switch,
  Route,
  Routes,
  useLocation,
  useNavigate,
  // Link,
} from "react-router-dom";

import Home from './components/Home';
import Callback from './components/auth/42/callback';
import EditProfile from './components/EditProfile';
import {socket, SocketContext} from './components/Services/sockets'
import { Flex, useToast, Button } from '@chakra-ui/react';
import NotFound from './NotFound';
import { IoCloseCircleSharp } from 'react-icons/io5';
import ForbiddenRoom from './Forbidden';

export interface gameInvite {
    id : number;
    username : string;
}


export const AuthContext = createContext<any >(null)
export const AuthProvider = ({children} :  { children: JSX.Element }) => {
	const [token, setToken] = useState<any>()


	return (
    <AuthContext.Provider value={{token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuthq = () => useContext(AuthContext)

const App : React.FC <{}> = () => {
  
  const toast = useToast();
    
    const socket = useContext(SocketContext);
    const [show, setShow] = useState(false);
    const [user1, setUser1] = useState<gameInvite>({id : -1, username : ""});
    const [messageRef, setMessageRef] = useState<{name : string, message : string}>({ name: "", message: ""});

    useEffect(() => {
      
        socket.on("inviteToGame_server", (data : gameInvite ) => {
            setShow(true);
            setUser1(data);
            // console.log("sift lik message")
        })
        socket.on("sendMessage_server", (data : any) => {
        if (data)
         {
            console.log("dasad = ", data);
            // setMessageRef(data);
            // console.log("sift lik message")
            toast({
              title: `user jah message`,
              description: `jak message`,
              status: 'success',
              duration: 1500,
              isClosable: true,
              })
            }
            })
        return () => {
            socket.off();
        }
    // }, [messageRef, socket, toast])
    }, [])
    // console.log('Render lifecycle')
    return (
      <>
        <Router>
        <AuthProvider>

              <SocketContext.Provider value={socket}>
          
          <InviteModal user={user1.id} show={show} setShow={setShow} />
          
          <Routes>
                <Route path='/callback' element={<> 
								<Callback />
						 </>} />

            <Route
						path="/"
						element={
							<RequireNoAuth>
								<Welcome />
							</RequireNoAuth>
						}
					/>

            {/* <Route path='/' element={<><Welcome /> </>}> </Route> */}
                    
            <Route
						element={
							<RequireAuth>
								<Home state="HomeGAME" />
							</RequireAuth>
						}
					>
                <Route path='/channels' element={<>  <Home state="HomeGAME" /></>}>
                </Route>
                <Route path='/channels/:' element={<> </>}>
                </Route>
                {/* <Route path='/callback' element={<> <Callback /> </>} >
                </Route> */}
                <Route path='/EditInfo' element={<> <EditProfile /> </>} >
                </Route>
                <Route path='channels/allChannels' element={<> <Home state="allChannels" /> </>} >
                </Route>
                <Route path='channels/DM/:id' element={<> <Home state="DM" /> </>} >
                </Route>
                <Route path='channels/ROOM/:id' element={<> <Home state="ROOM" /> </>} >
                </Route>
                <Route path='channels/Game/' element={<> <Home state="GAME" /> </>} >
                </Route>
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                <Route path="*" element={<NotFound />} />
                <Route path="/Forbidden" element={<ForbiddenRoom />} />
            </Route>
          </Routes>
            </SocketContext.Provider>
            </AuthProvider>
        </Router>
      </>
    );
  }

export const InviteModal : React.FC <{
  show : boolean,
  user : number
  setShow :  React.Dispatch<React.SetStateAction<boolean>>;
}> = ({show, setShow, user}) => {

  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const accept = () => {
      socket.emit("acceptGame_client", user, (data : any) => {
      })
      navigate("/channels/Game/");
  }
  const decline = () => {
      socket.emit("rejectGame_client", user, (data : any) => {
      })
  }

  return<>

  { show && <> <div
    className=" absolute justify-center items-center  flex overflow-x-hidden  inset-0 z-50 outline-none focus:outline-none"
    onClick={() => { handleClose(); }}
  >
    <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
      <div className="w-[30rem] my-6 mx-auto h-[25rem]   " >
        <div className="border-0 rounded-lg lg:rounded-r-lg  h-[30rem] shadow-lg  flex flex-col w-full bg-discord_serverBg outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
          <div className="sm:mx-auto w-full h-1/6 ">
            <button
              className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
              onClick={() => { handleClose() }}
            >
              <IoCloseCircleSharp className="text-emerald-400" />
            </button>
            <h2 className="mt-6 text-center text-xl font-bold text-white">Modify Your Channel Setting </h2>
          </div>
          <Flex flexDir={"column"} justifyContent={"space-between"} gap={5} alignItems={"center"}>
             
             
                <Button colorScheme={"whatsapp"} onClick={() => {accept(); handleClose()}} >Accept</Button>
          <Button colorScheme='red' onClick={() => {decline(); handleClose()}}>Decline</Button>
            
          </Flex>
        </div>
      </div>
    </div>
  </div>
  <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
  }
</>
}

export const RequireAuth = ({ children } : { children: JSX.Element } ) => {

  const user : any = localStorage.getItem("currentUser");

  // console.log("req", user);
  const location = useLocation();

  if (isUserLoggedIn(user) === false)
    return <Navigate to="/" state={{ from: location }} />;
  // if (children)
  //   return children;
  return <Outlet />;
};

/**
 * @param {object} children
 * @breif will render the children login page if user is unauthenticated
 * 			else will redirect to previous page
 */
export const RequireNoAuth = ({ children } : { children: JSX.Element }) => {
  const user : any = localStorage.getItem("currentUser");




  if (isUserLoggedIn(user) === true)
    return <Navigate to={"/channels"} />;

    if (children)
    {
      console.log("i am here = ", children) 
        return children;
    }
    return <Outlet />;
};

// eslint-disable-next-line
// function RequireAuth({ children }: { children: JSX.Element }) {
//   console.log("well rup")
// 	const userData: string | null = localStorage.getItem("accessToken");
//   // console.log("accessToken = ", userData);
// 	let location = useLocation();

// 	if (isUserLoggedIn(userData) === false) {
// 		return <Navigate to="/" state={{ from: location }} replace />;
// 	}

// 	if (children) {
// 		return children;
// 	}
// 	return children;
// }
// // eslint-disable-next-line
// function NotRequireAuth({ children }: { children?: JSX.Element }) {
// 	const userData: string | null = localStorage.getItem("accessToken");

// 	let location = useLocation();

// 	if (isUserLoggedIn(userData) === true) {
// 		return <Navigate to="/channels" state={{ from: location }} replace />;
// 	}

// 	return children;
// }

const isUserLoggedIn = (userData: any): boolean => {
  // console.log(userData)
	if (
		userData &&
		userData !== null
    && userData !== undefined
	) {
		return true;
	}

	return false;
};

export default App;