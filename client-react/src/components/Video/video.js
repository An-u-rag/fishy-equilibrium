import React from 'react'
import vid from './background.mp4'


const Video = () => {

    const setPlayback = () => {
        document.querySelector('video').playbackRate = 0.8
    }

    return (
        <video onPlay={(event => ( setPlayback() ))} autoPlay loop muted 
                style={{
                width: "100%",
                height: "100%",
                left: "0%",
                top: "0%",
                zIndex: "-1",
                position: "fixed", 
                objectFit: "cover",
                transform: "translate(-50% -50%)"
                }}>      
        <source src ={vid} type="video/mp4" />
        </video>
    )
}

export default Video