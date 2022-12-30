import React from 'react'
import './not.css';

function ForbiddenRoom() {
  return (<>
    <div className='body1'>
            <div className="text">
  <div>ERROR</div>
  <h1>403</h1>
  <hr/>
  <div>Access to this Room Denied</div>
  <a href='/'> Return TO Home</a>
</div>

<div className="astronaut">
  <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="" className="src"/>
</div>
</div>
 </> )
}

export default ForbiddenRoom;
