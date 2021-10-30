import React, { useState } from 'react'
import axios from 'axios'
import { backendAPI } from '../../../Utility/Config'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import '../../../css/Auth.css';
import signUpPic from '../../../assets/signup.jpg'

const SignUp = () => {

const [username, setUsername] = useState()
const [password, setPassword] = useState()
const [validatePassword, setValidatePassword] = useState()
const history = useHistory();

const createUser = async (e) => {
    e.preventDefault();
    // checkPasswords()
    try {
        if (password === validatePassword) {            

            const res = await axios.post(`${backendAPI}/users/`, {

                email: username,
                username: username,
                password: password,
                re_password: password
            })
            console.log(res);
            history.push('/login')
        }
    } catch (error) {
        console.log(error);
    }
}

const capturePassword = (e) => {
    setPassword(e.target.value)
}

const confirmPassword = (e) => {
    setValidatePassword(e.target.value)
}

const captureUsername = (e) => {
    setUsername(e.target.value)
}

// const checkPasswords = async (e) => {
//     await setPassword(e.target.value)
//     await setValidatePassword(e.target.value)
//     if (password !== validatePassword) {
//         alert('Passwords do not match!')
//     }
// }
    return (
			<>
				<h1 className='auth-title'>Wandr The World</h1>
				<div className='form-container signup-form'>
					<div className='auth-img-container'>
						<img className='auth-img' src={signUpPic}></img>
					</div>
					<form className='auth-form' onSubmit={createUser}>
						<h2 className='auth-form-title'>Sign Up</h2>
						<div className='username'>
							<label className='auth-label' htmlFor='email'>
								Email:
							</label>
							<input
								className='auth-input signUp'
								type='text'
								placeholder='enter email'
								onChange={captureUsername}
							/>
						</div>
						<div className='password'>
							<label className='auth-label' htmlFor='password'>
								Password:
							</label>
							<input
								className='auth-input signUp'
								type='password'
								placeholder=' enter password'
								onChange={capturePassword}
							/>
						</div>
						<div className='password '>
							<label className='auth-label' htmlFor='confirm password'>
								Confirm Password:
							</label>
							<input
								className='auth-input'
								type='password'
								placeholder=' enter password'
								onChange={confirmPassword}
							/>
						</div>
						<button type='submit' className='btn signup-login'>
							Sign Up
						</button>
					</form>
				</div>
				<div className='redirect-user'>
					<p className='redirect-info'>Already Have An Account? Login</p>
					<Link to='/login'>
						<button className='btn signup-login redirect-btn'>Login</button>
					</Link>
				</div>
			</>
		);
}

export default SignUp
