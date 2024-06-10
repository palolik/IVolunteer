/* eslint-disable no-unused-vars */
import  { useContext, useState,useEffect } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { BsFillEyeFill } from "react-icons/bs";
import { IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  useEffect(() => {
    document.title = 'Login page';
  }, []);
  const [show, setShow] = useState(false);
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location)

  const handleLogin = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      signIn(email, password)
          .then(result => {
              const loggedInUser = result.user;
              console.log(loggedInUser);
              const user = { email };

              // get access token
              axios.post('https://a11-server-sigma.vercel.app/jwt', user, { withCredentials: true })
                  .then(res => {
                      console.log(res.data)
                      if (res.data.success) {
                          navigate(location?.state ? location?.state : '/')
                      }
                  })

          })
          .catch(error => console.log(error));
  }
  const handleGoogleLogin = () => {
    signInWithGoogle().then(result => {
        console.log(result.user);
        toast("Success", "Login successful", "success");
        navigate(location?.state ? location.state : '/');
    })
        .catch(error => toast(error.code, error.message, "error"));

};
  return (
    <div className='m-4 h-[600px]'>
      <h2 className='text-4xl font-bold mb-4'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control ">
          <label >Email</label>
          <div className='flex flex-row min-w-20 items-center'><input className='w-20' type="email" name="email" id="" required /></div> 
        </div>
        <div className="form-control">
          
        <label  htmlFor="password">Password</label>
         <div className='flex flex-row min-w-20 items-center'> <input type={show ? "text" : "password"} name="password" id="" required />
          <span className='-ml-10 ' onClick={() => setShow(!show)}>
            {
              show ? <IoMdEyeOff className='w-7'/>
              : <BsFillEyeFill className='w-7' />
            }
         </span> </div>
         </div>
         <div className='flex flex-row w-full items-center'>
        <input className='btn-submit' type="submit" value="Login" /></div>
      </form>

      <div className='flex flex-row min-w-20 items-center'>
      <button className="rounded-full p-2 hover:bg-slate-200 ml-20" onClick={handleGoogleLogin}><img className="h-10" src="google.png" alt="" /></button>
      {/* <button className="rounded-full p-2 hover:bg-slate-200" onClick={handlegithubLogin}><img className="h-10" src="github.png" alt="" /></button> */}
      </div>       
      <p><small>New to the website <Link to="/signup">Create New Account</Link></small></p>
      <ToastContainer />
    </div>
  );
};

export default Login;


// const Login = () => {
//   useEffect(() => {
//     document.title = 'Login page';
//   }, []);
//   const [show, setShow] = useState(false);

//   const { signIn, signInWithGoogle} = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/';

//   const handleLogin = async (event) => {
//     event.preventDefault();
  
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;
  
//     try {
//       const result = await signIn(email, password);
//       console.log(result.user);
//       form.reset();
//       navigate(from, { replace: true });
  
//       // Access the token from the result.user object
//       const token = result.user.getIdToken(); // Assuming getIdToken() returns the token
      
//       axios.post('https://a11-server-sigma.vercel.app/jwt', { token }, { withCredentials: true })
//         .then(res => {
//           console.log(res.data)
//           if (res.data.success) {
//             navigate(location?.state ? location?.state : '/')
//           }
//         })
//     } catch (error) {
//       toast("wrong email or password!");
//     }
//   };
  

//   const handleGoogleLogin = () => {
//     signInWithGoogle().then(result => {
//         console.log(result.user);
//         toast("Success", "Login successful", "success");
//         navigate(location?.state ? location.state : '/');
//     })
//         .catch(error => toast(error.code, error.message, "error"));

// };
