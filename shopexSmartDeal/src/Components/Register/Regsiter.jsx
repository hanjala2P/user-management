import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {
    const { creatUser, signInWithGoogle } = use(AuthContext);
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

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const imgURL = form.imgURL.value;
        const password = form.password.value;

        creatUser(email, password)
            .then((result) => {
                return updateProfile(result.user, {
                    displayName: name,
                    photoURL: imgURL,
                }).then(() => saveUserToDB({ name, email, image: imgURL }));
            })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Registration failed",
                    text: error.message
                });
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };

                // create user in the database
                return saveUserToDB(newUser);
            })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registered successfully",
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

    return (
        <div className='flex flex-col items-center justify-center mt-20 mb-20'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <section className="fieldset">
                        <div className='pb-6'>
                            <h2 className='text-center font-medium text-2xl'>Register Now!</h2>
                            <p className='text-center'>
                                Already have an account?{' '}
                                <span className='text-primary'>
                                    <Link to='/login'>Login</Link>
                                </span>
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className='space-y-3'>
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input input-bordered w-full" placeholder="Name" required />

                            <label className="label">Email</label>
                            <input name='email' type="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">Img URL</label>
                            <input name='imgURL' type="text" className="input input-bordered w-full" placeholder="Image URL" />

                            <label className="label">Password</label>
                            <input name='password' type="password" className="input input-bordered w-full" placeholder="********" required />

                            <div>
                                <a className="link link-hover text-sm">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn w-full bg-primary text-white mt-4">
                                Register
                            </button>
                        </form>

                        <div className='flex items-center text-center mt-6 gap-2'>
                            <span className='flex-1 border-t border-gray-400'></span>
                            <p className='text-gray-500'>OR</p>
                            <span className='flex-1 border-t border-gray-400'></span>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className='btn mt-6 w-full text-md border border-gray-300'
                        >
                            <FcGoogle size={20} /> Continue with Google
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Register;