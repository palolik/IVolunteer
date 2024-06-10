import {  useLocation, useNavigate, } from "react-router-dom";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const Ivolunteer = ({ post, }) => {
   
    const routeLocation = useLocation();
    const navigate = useNavigate();

    const { _id,image, item_name, subcategory_Name, loca_tion,shortDescription,no_volunteer,Dead_line,Status,Suggestion  } = post;

    // console.log(location);

    const handleDelete = (_id) => {
        // console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://a11-server-sigma.vercel.app/delvolunteer/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Request cancelled!",
                                
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // navigate('/posts')
                                    navigate(routeLocation?.pathname ? routeLocation.pathname : '/')
                                }
                            });

                        }
                    })
            }
        });

    }
    return (
        <div className="flex flex-row w-full gap-5 p-5 shadow-lg m-10 rounded-xl">
        <div className="w-full lg:w-2/3 h-[300px]">
            <img className="w-full h-full" src={image} alt="image" />
        </div>
        <div className="w-full lg:h-1/2 lg: flex flex-col gap-3">
            <h1 className="font-bold text-2xl">{item_name}</h1>
            <h4 className="font-semibold text-base flex flex-row gap-3">
                <span>Category: {subcategory_Name}</span>
               
            </h4>
            <span className="font-semibold text-base flex flex-row gap-3">Location: {loca_tion}</span>
            <p className="font-bold text-base">{shortDescription}</p>
            <p className="font-bold text-base">{Suggestion}</p>
            <p className="font-bold text-base">Status:   {Status}</p>
            <h4 className="font-semibold text-base flex flex-row gap-3">
                <span className="font-semibold text-xl ">Number of Volunteer: {no_volunteer}</span>
                
                
            </h4>
            <span className="font-semibold text-xl ">Dead line: {Dead_line }</span>
            <button onClick={() => handleDelete(_id)} className="btn btn-xs btn-error">CANCEL</button>
        </div>
    </div>
     
          
      
    );
};


Ivolunteer.propTypes = {
    post: PropTypes.object,
    index: PropTypes.number,
}

export default Ivolunteer;