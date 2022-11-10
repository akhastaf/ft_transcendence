import React  from 'react';
import logo from '../images/rsz_ponglogo.png';
// import { useHistory } from "react-router-dom";
import {Si42} from "react-icons/si";
import {MenuIcon} from '@heroicons/react/outline';
// import {localService} from '../api/axios'


var scrollTrigger = 60;
      
class Header extends React.PureComponent {


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

  componentDidMount() {
   // console.log('componentDidMount() lifecycle');
  //  this.state.scrolling = false;
   window.addEventListener('scroll', this.handleScroll);
   
    // Trigger update
    // this.setState({ foo: !this.state.foo });
  }

  handleScroll(event) {

    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
      document.getElementsByTagName('Header')[0].classList.remove('bg-emerald-400');
      document.getElementsByTagName('Header')[0].classList.add('bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500');

      // document.getElementsByTagName('Header')[0].classList.add('bg-angol_main');

      // this.setState({scrolling: false});
    }
    else {
      document.getElementsByTagName('Header')[0].classList.remove('bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500');
    document.getElementsByTagName('Header')[0].classList.add('bg-emerald-400');
      // this.setState({scrolling: true});
  }
    // let scrollTop = event.srcElement.body.scrollTop,
    //     itemTranslate = Math.min(0, scrollTop/3 - 60);

    // this.setState({
    //   transform: itemTranslate
    // });
  }

  async Login(event) {
    // const form = new FormData(event.target);
    console.log("hello");
    window.location.assign("http://localhost:3000/auth/login/42");
    
    // const info = await localService.get("/auth/login/42")
    // .then (() => {
    //   console.log("hello ===>" + info.data);
    // const accessToken = info?.data?.accessToken;
    // console.log(accessToken)
    // }).catch ((err) => {console.log("error ss = " + err)});

  }

  render() {
          
    
    return (
     <>
      <header onScroll={this.handleScroll}  className=" flex items-center justify-between py-2 px-6 bg-gradient-to-r from-green-400 to-blue-500">
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
