import React  from 'react';
// import logo from '../images/rsz_ponglogo.png';
// import { useHistory } from "react-router-dom";
import {Si42} from "react-icons/si";
import {MenuIcon} from '@heroicons/react/outline';
// import {localService} from '../api/axios'

const logo = require('../../images/rsz_ponglogo.png');

      
class Header extends React.PureComponent {




  async Login(event : any) {

    window.location.assign(`${process.env.REACT_APP_ServerHostName}/auth/login/42`);
  }

  render() {
          
    
    return (
     <>
      <header   className=" flex items-center justify-between py-2 px-6 bg-gradient-to-r from-green-400 to-blue-500">
        <a href="/">
              <img src={logo} alt="ping pong logo" className="w-36 object-cover"/>
          </a>
          <div className=" hidden lg:flex space-x-6">
              <a  href="/" className="link arcade text-2xl">About us</a>
              <a href="/" className="link arcade text-2xl">Support</a>
          </div>
          <div className="flex space-x-4">
            {/* <form method="get"> */}
              <button onClick={this.Login} className="text-black border-4 border-angol_main bg-gradient-to-l from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 font-bold arcade " > <Si42 className="inline mr-1"/> Login</button>
          {/* </form> */}
          <MenuIcon className="text-secondary_color h-11 cursor-pointer lg:hidden"/>
          </div>
         
      </header>
      {/* <div className=" sticky top-16 scroll-smooth hover:scroll-auto">
          <hr className="border-gray-700 border mx-auto" />
          </div> */}
        </>
    )

}


}
  
export default Header
