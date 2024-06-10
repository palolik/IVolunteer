import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdatePost = () => {
    const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {
        document.title = "Update Post"
    }, []);
    const place = useLoaderData();

    const { _id, image, item_name, subcategory_Name, loca_tion, shortDescription, no_volunteer, Dead_line, userName, userEmail } = place;

    useEffect(() => {
        // Set startDate to Dead_line when component mounts
        if (Dead_line) {
            setStartDate(new Date(Dead_line));
        }
    }, [Dead_line]);

    const handleUpdatePost = (event) => {
        event.preventDefault();

        const form = event.target;
        const updatedImage = form.image.value;
        const updatedItemName = form.item_name.value;
        const updatedSubcategoryName = form.subcategory_Name.value;
        const updatedLocation = form.loca_tion.value;
        const updatedShortDescription = form.shortDescription.value;
        const updatedNoVolunteer = form.no_volunteer.value;
        const updatedPostData = {
            _id, image: updatedImage, item_name: updatedItemName, subcategory_Name: updatedSubcategoryName,
            loca_tion: updatedLocation, shortDescription: updatedShortDescription,
            no_volunteer: parseInt(updatedNoVolunteer), Dead_line: startDate.toISOString(), userName, userEmail
        };

        fetch(`https://a11-server-sigma.vercel.app/post/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    Swal.fire({
                        title: 'Volunteer post updated',
                        text: 'Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleUpdatePost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col lg:w-1/3 gap-3 h-full">
                    <h1 className="font-black text-3xl shadow-2xl p-5 w-full text-center text-black">Update Project</h1>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                            Image Url
                            <input type="text" name="image" className="grow" defaultValue={image} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Post Name
                            <input type="text" name="item_name" className="grow" defaultValue={item_name} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Category
                            <input type="text" name="subcategory_Name" className="grow" defaultValue={subcategory_Name} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Location
                            <input type="text" name="loca_tion" className="grow" defaultValue={loca_tion} />
                        </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">
                        <label className="input input-bordered flex items-center gap-2">
                            No. of Volunteer
                            <input type="number" name="no_volunteer" className="grow" defaultValue={no_volunteer} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            No. of Volunteer
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            popperPlacement="top-end"
                        />   </label>
                        <textarea name="shortDescription" className="textarea textarea-bordered" defaultValue={shortDescription}></textarea>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">
                        <label className="input input-bordered flex items-center gap-2" >
                            Email
                            <input type="email" name="userEmail" className="grow" defaultValue={userEmail} disabled />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            User name
                            <input type="text" name="userName" className="grow" defaultValue={userName} disabled />
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Update Post" className="btn btn-warning w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdatePost;
