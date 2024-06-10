/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import {useNavigate, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import Swal from 'sweetalert2';

const Beavolunteer = () => {
    const { user } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Update Volunteer";
  }, []);


  const place = useLoaderData();
    const navigate = useNavigate();
  const {
    _id,
    image,
    item_name,
    subcategory_Name,
    loca_tion,
    shortDescription,
    no_volunteer,
    Dead_line,
   
  
  } = place;
  const handleAddPost = (event) => {
    event.preventDefault();

    const form = event.target;
    const image = form.image.value;
    const Pid = form.Pid.value;
    const item_name = form.item_name.value;
    const subcategory_Name = form.subcategory_Name.value;
    const loca_tion = form.loca_tion.value;
    const shortDescription = form.shortDescription.value;
    const no_volunteer = form.no_volunteer.value;
    const Dead_line = form.Dead_line.value;
    const Suggestion = form.Suggestion.value;
    const Status = form.Status.value;
    const userEmail = form.userEmail.value;
    const userName = form.userName.value;

    const postData = {
        image: image,
        item_name: item_name,
        Pid: Pid,
        Suggestion:Suggestion,
        Status:Status,
        subcategory_Name: subcategory_Name,
        loca_tion: loca_tion,
        shortDescription: shortDescription,
        no_volunteer: parseInt(no_volunteer)- 1,
        Dead_line: Dead_line,
        userEmail: userEmail,
        userName: userName,
    }

    fetch('https://a11-server-sigma.vercel.app/addValunteer', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Valunteer request successful !",
                    text: "You have successfully added a new Post",
                    icon: "success"
                });
                form.reset();
            }
            // console.log(data);
        })
}

  return (
    <div>
      <div className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
        <div className="flex flex-col lg:w-1/3 gap-3 h-full">
          <h1 className="font-black text-3xl shadow-2xl p-5 w-full text-center text-black">
            Project Details
          </h1>
          <form onSubmit={handleAddPost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
          <div className="flex flex-col gap-2 w-full">
           
            <div className="w-full  h-[300px]">
            <img className="w-full h-full" src={image} alt="image" />
          </div>
           <input type="text" name="image" className="grow" defaultValue={image} />
           <input type="text" name="Pid" className="grow" defaultValue={_id} />
            <label className="input input-bordered flex items-center gap-2">
              Post Name:
                <input type="text"  name="item_name" className="grow" defaultValue={item_name} readOnly/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Category:
                <input type="text"  name="subcategory_Name" className="grow" defaultValue={subcategory_Name} readOnly/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Location:
                <input type="text"  name="loca_tion" className="grow" defaultValue={loca_tion} readOnly/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Suggestion:
                <input type="text"  name="Suggestion" className="grow" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Status
                <input type="text"  name="Status" className="grow" defaultValue="requested" readOnly/>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <label className="input input-bordered flex items-center gap-2">
              No. of Volunteer:
                <input type="text"  name="no_volunteer" className="grow" defaultValue={no_volunteer} readOnly/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Deadline:
                <input type="text"  name="Dead_line" className="grow" defaultValue={Dead_line} readOnly/>
            </label>
            <textarea
              name="shortDescription"
              className="textarea textarea-bordered"
              defaultValue={shortDescription}
              readOnly
            ></textarea>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
          <label className="input input-bordered flex items-center gap-2">
  Email:
    <input type="text"  name="userEmail" className="grow" defaultValue={user?.email} readOnly/>
</label>
<label className="input input-bordered flex items-center gap-2">
  User Name:
    <input type="text"  name="userName" className="grow" defaultValue={user?.displayName || user?.name} readOnly/>
</label>
          </div>
          <div>
                    <input type="submit" value="Add Request" className="btn bg-green-500 text-white w-full" />
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Beavolunteer;
