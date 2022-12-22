
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import Welcome from './components/Welcome/Welcome';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  // Switch,
  Route,
  Routes,
  useLocation,
  // Link,
} from "react-router-dom";

import Home from './components/Home';
import Callback from './components/auth/42/callback';
import EditProfile from './components/EditProfile';
import useLocalStorage from './hooks/useLocalStorage';
import { UserType } from './components/Types/types';
import {socket, SocketContext} from './components/Services/sockets'
import { useAuth } from './components/Services/auth';
import { current } from '@reduxjs/toolkit';
import { useToast } from '@chakra-ui/react';
import NotFound from './NotFound';


export interface gameInvite {
    id : number;
    name : string;
}

const App : React.FC <{}> = ({}) => {

  const toast = useToast();
    
    const socket = useContext(SocketContext);
    const [show, setShow] = useState(false);
    const [user1, setUser1] = useState<gameInvite>({id : -1, name : ""});
    const [messageRef, setMessageRef] = useState<{name : string, message : string}>({ name: "", message: ""});
    useEffect(() => {

        socket.on("sendMessage_server", (data : any) => {
          setMessageRef(data);
            console.log("sift lik message")
            toast({
              title: `user jah message`,
              description: `jak message`,
              status: 'success',
              duration: 5000,
              isClosable: true,
              })
              socket.off();
        })
        socket.on("inviteToGame_server", (data : gameInvite ) => {
            setShow(true);
            setUser1(data);
            // console.log("sift lik message")
            toast({
              title: `Game Invite`,
              description: `U received a game from ${data.name}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
              })
        })
    },[messageRef])
    // console.log('Render lifecycle')
    return (
      <>
        <Router>
              <SocketContext.Provider value={socket}>
          <Routes>

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
                <Route path='channels/Game/:id' element={<> <Home state="GAME" /> </>} >
                </Route>
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path='/callback' element={<> <Callback /> </>} >
                </Route>
          </Routes>
            </SocketContext.Provider>
        </Router>
      </>
    );
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
  // console.log("not req", auth);
  console.log("user in no req = ",user)
  const location = useLocation();

  if (isUserLoggedIn(user) === true)
    return <Navigate to={"/channels"} />;

    if (children)
      return children;
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