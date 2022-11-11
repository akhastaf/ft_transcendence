import React from 'react';
import { GiPingPongBat } from "react-icons/gi";
import {GiChatBubble} from "react-icons/gi";
import TeamSection from './Home/DevCard';
import DevCard from './Home/DevCard';
// import ReactPlayer from 'react-player';
// import LowerHero from './lowerHero.js';
// import Video from './video.js'

function Hero() {
  return (
    <>
   
    <div className="bg-gradient-to-r from-green-400 to-blue-500 pb-8 md:pb-0 lg:flex lg:flex-col lg:items-center paa">
      
        <div className="p-7 py-9 h-screen sm:h-[60vh] md:h-[40vh] md:flex lg:items-center">
            <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
                <h1 className="text-5xl text-white font-bold"> Enjoy The Arcade World </h1>
                <h2 className="text-white arcade text-lg font-light tracking-wide lg:max-w-3xl w-full"> 
                Whether you’re part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, Discord makes it easy to talk every day and hang out more
            often.
            </h2>
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6">
                    <button className="bg-white w-60 font-medium flex items-center justify-center rounded-full arcade p-4 text-lg hover:bg-slate-100 hover:shadow-2xl hover:text-secondary_color focus:outline-none transition duration-200 ease-in-out"> <GiPingPongBat className = "w-6 mr-7" /> Start The Game </button>
                    <button className="bg-gray-900 text-white w-60 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-secondary_color hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out"> <GiChatBubble className = "w-6 mr-7" /> Start Chatting</button>
                </div>
            </div>
            <div className="flex-grow">
              <img src = "1.png" alt="imade" className="-left-36 mt-4 sm:-left-4 md:hidden"/>
              <img src="1.png" alt="imagde" className="hidden md:inline "/>

            </div>
        </div>
        <div className='flex flex-row gap-10 justify-between'>
        <TeamSection/>
        </div>
        {/* <Video className=""/> */}
       
    </div>
    </>

  )
}


export default Hero