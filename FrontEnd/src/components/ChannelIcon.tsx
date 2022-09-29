import React from 'react';
// import ReactTooltip from 'react-tooltip';
// import  Tippy from '@tippy.js/react';
// import 'tippy.js/dist/tippy.css';
// import { Tooltip } from '@chakra-ui/react'
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";


// function Span() {
//   return (
//     <>
//       <span> challenges</span>
//     </>
//   )
// }

function ServerIcon(props : any) {

  // const [isHovering, setIsHovering] = useState(false);
  // const handleMouseOver = () =>
  // {
  //     setIsHovering(true);
  // }
  // const handleMouseOut = () =>
  // {
  //     setIsHovering(false);
  // }

  return (
    <>
    {/* <Tooltip data-tooltip-target="tooltip-right" data-tooltip-placement="right"  className="mb-3 md:mb-0 text-white bg-emerald-400 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-400 dark:focus:ring-blue-800" label={props.channelName} > */}
     <div>
    <Tooltip interactive className="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-emerald-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-emerald-400"  content={props.channelName} placement="right" >
      
      <Avatar size="md"
        variant="circular"
      	src={props.image}
      	alt=""
		className=" bg-white bg-opacity-25 cursor-pointer rounded-3xl hover:rounded-md transition-all duration-100 ease-out  "
		/>
    </Tooltip>
   {/* </Tooltip> */}
  </div>
    </>
  )
}

export default ServerIcon
