import { useContext, useEffect, useState } from 'react';
import './Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Header = () => {
const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
const handleToggle = (e) => {
  if(e.target.checked){
    setTheme("dark");
  } else {
setTheme("light");
  }
}
useEffect (() => {
  localStorage.setItem("theme", theme);
  const localTheme = localStorage.getItem("theme");
  document.querySelector('html').setAttribute("data-theme", localTheme);
}, [theme]);

  const { user, logOut } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const handleLogout = async () => {
    try {
      await logOut();
      // console.log('Logged out successfully');
    } catch (error) {
      // console.error('Logout error:', error);
    }
  };

  useEffect(() => {

    AOS.init();

    const unsubscribe = async () => {
      if (user) {
        const db = getFirestore();
        const colRef = collection(db, 'users');
        const q = query(colRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      }
    };

    unsubscribe();

    return () => unsubscribe();
  }, [user]);

  return (
    <div className='lg:mb-10'>
      <nav className='flex flex-row items-center justify-between mt-5 lg:mx-10'>
        <div className='animate__animated animate__headShake text-2xl lg:text-[45px] font-bold dark:text-gray-900 text-blue-700'>IVolunteer</div>

        <div className='hidden lg:flex flex-row space-x-4 items-center'>
          <NavLink className='btn btn-sm hover:bg-blue-500' to="/">Home</NavLink>
          <NavLink className='btn btn-sm hover:bg-blue-500' to="/allposts">Need Volunteer</NavLink>
 
<label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true}  />
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
          {user ? (
            <div className='flex items-center'>
            
              {/* <NavLink className='btn btn-sm hover:bg-blue-500 mx-1' to='/addpost'>Add Request</NavLink> */}
              <NavLink className='btn btn-sm hover:bg-blue-500 mx-1' to={`/myvolunteerreq/${user.email}`}>My Volunteer Request</NavLink>

          
              <button onClick={handleLogout} className='btn btn-sm ml-2 hover:bg-blue-500'>Logout</button>
              {/* <button  className='btn btn-sm ml-2 hover:bg-blue-500' to='/myprofile' >My Profile</button> */}
              <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn btn-sm ml-2 hover:bg-blue-500">My Profile</div>
  <ul tabIndex={0} className="dropdown-content z-[150] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li>  <NavLink className='btn btn-sm hover:bg-blue-500 mx-1' to='/addvolunteer'>Add Volunteer Post</NavLink></li>
    <li>  <NavLink className='btn btn-sm hover:bg-blue-500 mx-1' to={`/managevolunteer/${user.email}`}>Manage My Post</NavLink></li>
  </ul>
</div>
                {data.length > 0 ? (
             <div className="avatar pl-2">  {data.map((item) => (
                <div key={item.uid} className="w-12 rounded-full">
                  <div className="tooltip" data-tip="${item.photoURL}">
                  <img src={item.photoURL} alt='User' className='rounded-full mr-2' />
                </div>
                 </div> ))}
              </div>
      ) : (
        <p>Loading..</p>
      )}   
            </div>
          ) : (
            <>
              <NavLink className='btn btn-sm hover:bg-blue-500' to="/signup">Sign Up</NavLink>
              <NavLink className='btn btn-sm hover:bg-blue-500' to="/login">Log In</NavLink>
            </>
          )}
        </div>

        <div className="navbar-end drawer drawer-end lg:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
  
    <label htmlFor="my-drawer-4" className="drawer-button btn "><AiOutlineMenu></AiOutlineMenu></label>
  </div> 
  <div className="drawer-side z-[200]">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
    <NavLink className='text-lg btn-accent mx-1' to="/">Home</NavLink>
          <NavLink className='text-lg btn-accent mx-1' to="/allposts">Need Volunteer</NavLink>
            
                {user ? (
            <div className=''>
            
            
              <NavLink className='text-lg btn-accent mx-1' to={`/myvolunteerreq/${user.email}`}>My Volunteer Request</NavLink>

          
<button onClick={handleLogout} className='text-lg btn-accent mx-1'>Logout</button>
          
              
           
                {data.length > 0 ? (
             <div className="avatar pl-2">  {data.map((item) => (
                <div key={item.uid} className="w-12 rounded-full">
                  <img src={item.photoURL} alt='User' className='rounded-full mr-2' />
                </div> ))}
              </div>
      ) : (
        <p>Loading..</p>
      )}   
            </div>
          ) : (
            <>
              <NavLink className='btn btn-sm hover:bg-blue-500' to="/signup">Sign Up</NavLink>
              <NavLink className='btn btn-sm hover:bg-blue-500' to="/login">Sign In</NavLink>
            </>
          )}
   
    </ul>
  </div> 
  </div>
      </nav>
    </div>
  );
};

export default Header;
