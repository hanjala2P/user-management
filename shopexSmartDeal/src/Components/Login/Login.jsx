
import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const {signInWithGoogle}= use(AuthContext)

    const handlegoogleSignIN =()=>{
        signInWithGoogle()
        .then()
        .catch()
    }
     const handleLogin=(e)=>{
        e.preventDefault()

        const email= e.target.email.value;
        const Password= e.target.name.value;

        const userInfo={email,Password}
        console.log(userInfo)

    }
    return (
       <div>
            <div className='flex flex-col items-center justify-center mt-40'>
                
                <form action="">
                     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
            <div className='pb-6 pt-10'>
                <h2 className='text-center font-medium text-2xl'>Login Now!</h2>
                <p className='text-center'>Don't have an account? <span className='text-primary'> <Link to='/register'>Register</Link> </span> </p>
            </div>
       <form onSubmit={handleLogin} className='space-y-3' action="">
         
           <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="********" />
          <div><a className="link link-hover hover:text-primary">Forgot password?</a></div>
          <button className="btn w-full bg-primary mt-4">Login</button>
       </form>
        <div className='flex items-center text-center mt-6 '>
            <span className='w-35 border border-gray-600'></span><p className='text-lg'>OR</p> <span  className='w-35 border border-gray-600'></span>
        </div>
        <button onClick={handlegoogleSignIN} className='btn mt-6 text-md items-center bg-none border border-gray-600'> <FcGoogle />Continue with google</button>
        </fieldset>
      </div>
    </div>
                </form>
                

            </div>
        </div>
    );
};

export default Login;