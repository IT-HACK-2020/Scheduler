import React, { useState } from 'react';
import './Login.scss';
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithGoogle } from './firebase';
import { useStateValue } from "../../StateProvider";

const Login = ({ hide }) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState("");
    const [{ user }, dispatch] = useStateValue();

    const hideModalLogin = () => {
        setTimeout(hide, 1000);
    }

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth.user) {
                    history.push('/');
                    hideModalLogin();
                }
            })
            .catch(error => setErrors(e.message))

    }

    const register = e => {
        e.preventDefault();
        // setTimeout(hide, 2000);

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth.user) {
                    history.push('/');
                    hideModalLogin();
                }
            })
            .catch(error => setErrors(e.message))

    }

    const signWithGoogle = () => {
        signInWithGoogle();
        hideModalLogin();
    };


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
                    <h1>Вход</h1>

                    <form>
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                        <h5>Пароль</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                        <button type='submit' onClick={signIn} className='login__signInButton'>Войти</button>
                    </form>


                    <button className='login__registerButton' onClick={register}>Создать аккаунт</button>
                    <button onClick={signWithGoogle} className='login__registerButton' type="button">
                        <img style={{ width: '15px', margin: '5px 5px 0 0' }}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
                    Войдите через Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;