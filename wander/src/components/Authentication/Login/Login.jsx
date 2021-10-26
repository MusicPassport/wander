import axios from 'axios';
import React from 'react'
import { backendAPI } from '../../../Utility/Config';

const Login = () => {

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        axios.post(`${backendAPI}/token/login`)
    } catch (error) {
        console.log(error);
    }

}

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='username'>
            <label htmlFor="">Username:</label>
            <input type="text" placeholder=' e.g. myaddress@email.com'/>
            </div>
            <div className='password'>
            <label htmlFor="">Password:</label>
            <input type="text" placeholder=' enter password'/>
            </div>
            <button type="submit" className='signup-login'>Login</button>
        </form>
    )
}

export default Login
