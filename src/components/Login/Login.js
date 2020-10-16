import React, { useState } from 'react';
import './Login.scss';
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithGoogle } from './firebase';


const Login = ({ hide }) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState("");

    const signIn = e => {
        e.preventDefault();
        setTimeout(hide, 2000);

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth.user) history.push('/');
            })
            .catch(error => setErrors(e.message))
    }

    const register = e => {
        e.preventDefault();
        setTimeout(hide, 2000);

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth.user) history.push('/');
            })
            .catch(error => setErrors(e.message))

    }

    return (
        <div className="login-wrapper">
            <div className='login'>

                <span className="close" onClick={hide}>x</span>
                {/* <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link> */}

                <div className='login__container'>
                    <h1>Sign-in</h1>

                    <form>
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                        <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                    </form>


                    <button className='login__registerButton' onClick={register}>Create your Account</button>
                    <button onClick={signInWithGoogle} class="googleBtn" type="button">
                        <img style={{ width: '20px' }}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
          Login With Google
        </button>
                </div>
            </div>
        </div>
    )
}

export default Login;