import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './components/Layout/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/providers/AuthProvider';
import HomePage from './components/Homepage/homepage';
import Myvolunteerreq from './components/Volunteer/Myvolunteerreq';
import AddPost from './components/Post/AddPost';
import MyList from './components/Post/MyList';
import UpdatePost from './components/Post/UpdatePost';
import ItemDetails from './Shared/ItemCard/ItemDetails';
import ErrorPage from './components/Error/Error';
import Beavolunteer from './components/Volunteer/Beavolunteer';
import AllPosts from './components/Post/AllPost';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
        loader: ()=> fetch('https://a11-server-sigma.vercel.app/allData'),
      }, 
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
// {
//         path: '/aboutus',
//         element: <Aboutus></Aboutus>
//       },
//       {
//         path: '/updateprofile',
//         element: <Updatepro></Updatepro>
//       },
    {
      path:'/addvolunteer',
      element:<AddPost></AddPost>
    },
  {
    path: '/managevolunteer/:email',
    element: <MyList></MyList>,
     loader: ({params})=> fetch(`https://a11-server-sigma.vercel.app/myPost/${params.email}`),
},
{
  path: '/update/:id',
  element: <UpdatePost></UpdatePost>,
   loader: ({params}) => fetch(`https://a11-server-sigma.vercel.app/post/${params.id}`),
},
{
  path: '/post/:id',
  element:<ItemDetails></ItemDetails>,
   loader: ({params}) => fetch(`https://a11-server-sigma.vercel.app/post/${params.id}`),
},

{
  path: '/beavolunteer/:id',
  element:<Beavolunteer></Beavolunteer>,
   loader: ({params}) => fetch(`https://a11-server-sigma.vercel.app/post/${params.id}`),
},
{
  path: '/myvolunteerreq/:email',
  element:<Myvolunteerreq></Myvolunteerreq>,
   loader: ({params}) => fetch(`https://a11-server-sigma.vercel.app/volunteer/${params.email}`),
},
// {
//   path: '/category/:subcategory_name',
//   element: <ItemDetailsCategory></ItemDetailsCategory>,
//   // loader: ({params})=> fetch(`https://a11-server-sigma.vercel.app/catagory/${params.subcategory_name}`),
// },
{
  path: '/allposts',
  element: <AllPosts></AllPosts>,
 loader: ()=> fetch('https://a11-server-sigma.vercel.app/allPosts'),
},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} > </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)


