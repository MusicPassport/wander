import React from 'react';
import '../../css/About.css'
import video from '../../assets/Wandr promo.mp4'

const About = () => {
    return (
        <>
        <div className='about-image'>
            <video src={video} muted loop autoPlay></video>
        </div>
        <div className='about-text' >
            <p>By now we're sure you've heard the age-old expression "not all who wander are lost." Although true we have decided to embody that in our own way through the creation of this app. One who wanders may simply be one in search of a new adventure. By using the Wandr app we make it easy for you to discover that next adventure and encapsulate it as a memory for you to keep.</p>
        </div>
        </>
    );
};

export default About;