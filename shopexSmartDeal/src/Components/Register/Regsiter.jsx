import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router'; // Ensure this matches your router version
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {
    const { signInWithGoogle } = use(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const imgURL = form.imgURL.value;
        const password = form.password.value;

        const userInfo = { name, email, imgURL, password };
        console.log(userInfo);
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);

                const newUser = {

                    name:result.user.displayName,
                    email:result.user.email,
                    image:result.user.photoURL
                }

                // create user in the database
                fetch('http://localhost:3000/users',{
                    method:'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('data after user save',data)
                })
            })
            .catch((error) => {
                console.error(error);
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