import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { backendAPI } from '../../../Utility/Config';
import { DataContext } from '../../../Utility/Context.jsx';
import { Link } from 'react-router-dom';
import loginPic from '../../../assets/login.jpg'
import '../../../css/Auth.css'

const Login = () => {
	const { currentUser, setCurrentUser } = useContext(DataContext);
	const history = useHistory();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${backendAPI}/token/login`, {
				password: password,
				email: email,
			});
			console.log(res);
			const auth = res.data.auth_token;
			localStorage.setItem('auth', auth);
			await getUser(auth);
			history.push('/dashboard');
			// console.log(res.data.auth_token);
		} catch (error) {
			console.log(error);
		}
	};

	const getUser = async (auth) => {
		console.log(localStorage.getItem('auth'));
		// console.log(auth);

		const login = await axios.get(`${backendAPI}/users/me/`, {
			headers: {
				Authorization: `Token  ${auth}`,
			},
		});
		console.log(login.data.id);
		const getUserInfo = await axios.get(
			`${backendAPI}/users/${login.data.id}/`,
			{
				headers: {
					Authorization: `Token  ${auth}`,
				},
			}
		);
		console.log(getUserInfo);
		localStorage.setItem('currentUser', JSON.stringify(getUserInfo.data));
		setCurrentUser({ ...getUserInfo.data });
		console.log(currentUser);
	};

	const captureEmail = (e) => {
		setEmail(e.target.value);
	};

	const capturePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<>
			<h1 className='auth-title'>Welcome Back</h1>
			<div className='form-container'>
				<div className='auth-img-container'>
					<img className='auth-img' src={loginPic}></img>
				</div>
				<form className='auth-form signup-form' onSubmit={handleSubmit}>
					<h2 className='auth-form-title'>Login</h2>
					<div className='username'>
						<input
							type='text'
							placeholder='enter email'
							onChange={captureEmail}
							className='auth-input'
						/>
					</div>
					<div className='password'>
						<input
							className='auth-input'
							type='password'
							placeholder=' enter password'
							onChange={capturePassword}
						/>
					</div>
					<button type='submit' className='btn signup-login'>
						Login
					</button>
				</form>
			</div>
			<div className='redirect-user'>
				<p className='redirect-info'>New? Sign Up!</p>
				<Link to='/signup'>
					<button className='btn signup-login redirect-btn'>SignUp</button>
				</Link>
			</div>
		</>
	);
};

export default Login;
