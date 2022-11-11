import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Video extends Component {
    // constructor(props) {
    //     super(props);
    //     this.vidRef = React.createRef();
    //   }
    
    //     componentDidMount(){
    //         console.log(this.vidRef);
    //         // this.vidRef.current.;
    //         // if(this.vidRef && this.vidRef.current.player && this.vidRef.current.player.isPlaying)
    //         // this.vidRef.current.Player.isPlaying = true; 
    //         // console.log(this.vidRef.current);
            
    //     }

        render () {
        // const vidRef = useRef(null);

        return (
        <div className='player-wrapper'>
            <ReactPlayer
            className='react-player fixed-bottom'
            url= 'gamevid.mp4'
            width='100%'
            height='100%'
            playing={true}
            // muted={false} 
            loop={true} 
            controls = {true}
            onReady
            // ref={this.vidRef}

            />
            {/* <video
            autoPlay={true}
            width='100%'
            height='100%'
            src= 'gamevid.mp4'
            // loop={true}
            /> */}
        </div>
        )
    }
}

export default Video;