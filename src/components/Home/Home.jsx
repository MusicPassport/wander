import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Home.css';
import TypeAnimation from 'react-type-animation';
import landing from '../../assets/landing.jpg'

const Home = () => {
	return (
		<div className='landing-page'>
			<h1 className='headline'>Wandr</h1>
			<div className='typing-container'>
				<TypeAnimation
					className='typing'
					cursor={false}
					sequence={[
						'Wandr the world of music',
						3000,
						'Wandr the world of festivals',
						3000,
						`Wandr the world of concerts`,
						3000,
						'Wandr the world theatre',
						3000,
						'Wandr the world of everything',
					]}
					wrapper='a'
					repeat={1}
				/>
			</div>
			<div className='home-link'>
				<Link className='home-link link-text' to='/discover'>
					Explore
				</Link>
			</div>
		</div>
	);
};

export default Home;
