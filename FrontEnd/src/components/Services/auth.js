import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import Loading from "../components/Loading";

let AuthContext = React.createContext({
  isLoading: true,
  user: null,
  signin: () => Promise.resolve(false),
  verify: () => Promise.resolve(false),
  signout: () => Promise.resolve(false),
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);
  let [isLoading, setisLoading] = React.useState(true);
  let auth = useAuth();
  let signin = async (newUser) => {
    setisLoading(true);
    try {
      let response1 = await axios.get(
        `${process.env.WEBSITE_URL}/admin/login`,
        {
          ...newUser,
        },
        {
          withCredentials: true,
        }
      );
      if (response1.status !== 202) {
        setUser(null);
        setisLoading(false);
        return false;
      }
      let response = await axios(
        `${process.env.WEBSITE_URL}/user/me`,
        {
          method: "GET",
          withCredentials: true,
        }
      );
      //  response.data.role = ["MASTER"];
      //   response.data.roles = ["BLOG"];//
      setUser({ ...response.data });
      setisLoading(false);

      return true;
    } catch (error) {
      setUser(null);
      setisLoading(false);
      return false;
    }
  };

  let verify = async () => {
    //let s = await new Promise((resolve) =>
    //  setTimeout(() => {
    //    setisLoading(false);
    //    resolve();
    //  }, 5000)
    //);
    //? check with backend if user is still verified if no deauthenticate and retuen false
    try {
      let response = await axios(
        `${process.env.WEBSITE_URL}/admin/whoami`,
        {
          method: "GET",
          withCredentials: true,
        }
      );
      setUser({
        ...response.data,
      });
      setisLoading(false);
      return true;
    } catch (error) {
      setisLoading(false);
      setUser(null);
      return false;
    }
  };

  let signout = async () => {
    try {
      let response = await axios(
        `${process.env.WEBSITE_URL}/admin/logout`,
        {
          method: "GET",
          withCredentials: true,
        }
      );
      setUser(null);
      setisLoading(false);
    } catch (error) {
      setUser(null);
      setisLoading(false);
    }
  };
  useEffect(() => {
    verify();
  }, []);
  let value = { user, isLoading, signin, verify, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @param {object} children
 * @breif will render the children if the user is authenticated
 * 			will redirect to the login page if the user is not authenticated
 */
export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  const location = useLocation();

  if (!auth || !auth.user)
    return <Navigate to="/login" state={{ from: location }} />;

  return children;
};

/**
 * @param {object} children
 * @breif will render the children login page if user is unauthenticated
 * 			else will redirect to previous page
 */
export const RequireNoAuth = ({ children }) => {
  let auth = useAuth();
  const location = useLocation();

  if (auth && auth.user)
    return <Navigate to={location.state?.from?.pathname || "/"} />;

  return children;
};
