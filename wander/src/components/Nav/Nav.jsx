import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import './Nav.css'


const Nav = () => {

const [menuOpen, setMenuOpen] = useState(false)

const handleClick = () => {
    setMenuOpen(!menuOpen)
    // When the burger is clicked, we want its links to appear inside a dropdown. 
    // To do this, we use the menuOpen state variable.
}

    return (
        
        <header>
            <div className='links'>
            <Link to='/'>Home</Link>
            {/* <Link to='/calendar'>Calendar</Link> */}
            {/* <Link to='/timeline'>Timeline</Link> */}
            {/* <Link to='/map'>Map</Link> */}
            <Link to='/about'>About</Link>
            <Link to='/events'>Events</Link>
            <Link to='/login'>Login</Link> 
            <Link to='/signup'>Sign Up</Link> 
            </div>
            <div className='hamburger' onClick={handleClick}>
                <Hamburger />
                <div className={menuOpen ? 'linkDisplay' : 'links'}>
                    <Link to='/'>Home</Link>
                    {/* <Link to='/calendar'>Calendar</Link> */}
                    {/* <Link to='/timeline'>Timeline</Link> */}
                    {/* <Link to='/map'>Map</Link> */}
                    <Link to='/about'>About</Link>
                    <Link to='/events'>Events</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        </header>
    )
}
export default Nav;
