import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import '../../css/Nav.css';

const Nav = () => {
	const [menuOpen, setMenuOpen] = useState(false);
    const history = useHistory()

	const handleClick = () => {
		setMenuOpen(!menuOpen);
		// When the burger is clicked, we want its links to appear inside a dropdown.
		// To do this, we use the menuOpen state variable.
	};

    const logoutUser = () => {
        console.log("Logging Out!!")
        localStorage.clear();
        history.push('/')
    }

	return (
		<header>
			<div className='links hidden'>
				<Link className='nav-link' to='/'>
					Home
				</Link>
				{/* <Link to='/map'>Map</Link> */}
				<Link className='nav-link' to='/events'>
					Events
				</Link>
				<Link to='/discover' className='nav-link'>
					Discover
				</Link>
				{localStorage.getItem('currentUser') ? (
					<>
						<Link className='nav-link' to='/dashboard'>
							Dashboard
						</Link>
						<Link className='logout nav-link' onClick={logoutUser}>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link to='/login' className='nav-link'>
							Login
						</Link>
						<Link to='/signup' className='nav-link'>
							Sign Up
						</Link>
					</>
				)}
				<Link className='nav-link' to='/about'>
					About
				</Link>
			</div>
			<div className='hamburger' onClick={handleClick}>
				<Hamburger />
				<div className={menuOpen ? 'linkDisplay' : 'links hidden'}>
					<Link className='nav-link' to='/'>
						Home
					</Link>
					{/* <Link to='/map'>Map</Link> */}
					<Link className='nav-link' to='/about'>
						About
					</Link>
					<Link className='nav-link' to='/events'>
						Events
					</Link>
					{localStorage.getItem('currentUser') ? (
						<>
							<Link className='nav-link' to='/dashboard'>
								Dashboard
							</Link>
							<Link className='logout nav-link' onClick={logoutUser}>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/signup'>Sign Up</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};
export default Nav;
