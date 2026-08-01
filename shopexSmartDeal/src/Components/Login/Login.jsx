import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const navigate = useNavigate();

    const saveUserToDB = (userInfo) => {
        return fetch('https://shopex-smart-deal-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json());
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };

                // create user in the database if not already there
                return saveUserToDB(newUser);
            })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((error) => {
                // console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Google sign-in failed",
                    text: error.message
                });
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((error) => {
                // console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: "Please check your email and password."
                });
            });
    };

    return (
       <div>
            <div className='flex flex-col items-center justify-center mt-40'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <div className='pb-6 pt-10'>
                                <h2 className='text-center font-medium text-2xl'>Login Now!</h2>
                                <p className='text-center'>Don't have an account? <span className='text-primary'> <Link to='/register'>Register</Link> </span> </p>
                            </div>
                            <form onSubmit={handleLogin} className='space-y-3'>

                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" required />

                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="********" required />
                                <div><a className="link link-hover hover:text-primary">Forgot password?</a></div>
                                <button type="submit" className="btn w-full bg-primary mt-4">Login</button>
                            </form>
                            <div className='flex items-center text-center mt-6 '>
                                <span className='w-35 border border-gray-600'></span><p className='text-lg'>OR</p> <span  className='w-35 border border-gray-600'></span>
                            </div>
                            <button onClick={handleGoogleSignIn} className='btn mt-6 text-md items-center bg-none border border-gray-600'> <FcGoogle />Continue with google</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;