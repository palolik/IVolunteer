import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddPost = () => {
    const [startDate, setStartDate] = useState(new Date());
    useEffect(()=>{
        document.title = "Add New!"
    },[]);
    
    const { user } = useContext(AuthContext);
    console.log(user);
    const handleAddPost = (event) => {
        event.preventDefault();

        const form = event.target;
        const image = form.image.value;
        const item_name = form.item_name.value;
        const subcategory_Name = form.subcategory_Name.value;
        const loca_tion = form.loca_tion.value;
        const shortDescription = form.shortDescription.value;
        const no_volunteer = form.no_volunteer.value;
        const userEmail = form.userEmail.value;
        const userName = form.userName.value;

        const postData = {
            image: image,
            item_name: item_name,
            subcategory_Name: subcategory_Name,
            loca_tion: loca_tion,
            shortDescription: shortDescription,
            no_volunteer: parseInt(no_volunteer),
            Dead_line: startDate.toISOString(), 
            userEmail: userEmail,
            userName: userName,
        }

        fetch('https://a11-server-sigma.vercel.app/addPost', {
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
                        title: "New Post Added!",
                        text: "You have successfully added a new Post",
                        icon: "success"
                    });
                    form.reset();
                }
                console.log(data);
            })
    }

    return (
        <div className="flex flex-col items-center w-1/3">
            <h1 className="font-black text-3xl shadow-2xl  p-5  w-full text-center text-black">List A New Project</h1>
            <form onSubmit={handleAddPost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col  gap-3 h-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                            Thumbnail Url
                            <input type="text" name="image" className="grow" placeholder="enter image url" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        Title
                            <input type="text" name="item_name" className="grow" placeholder="Post Title" />
                        </label>                
                        <label className="input input-bordered flex items-center gap-2">
                        Category Name
                        <select name="subcategory_Name" className="grow">
                            <option value="">Select a Category</option>
                         
                            <option value="healthcare">healthcare</option>
                            <option value="education">education</option>
                            <option value="social service">social service</option>
                            <option value="animal welfare">animal welfare</option>
                        
                            
                        </select>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                         Location
                         <input type="text"  name="loca_tion" className="grow" placeholder="Location" />          
                        </label>
                        <textarea name="shortDescription" className="textarea textarea-bordered" placeholder="Short Description"></textarea>
                       </div>
                    <div className="flex flex-col gap-2 w-full h-full">
                        <label className="input input-bordered flex items-center gap-2">
                           No. of Volunteer
                            <input type="number" name="no_volunteer" className="grow" placeholder="enter price" />
                        </label>


                        <label className="input input-bordered flex items-center gap-2">
                       
                     
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            popperPlacement="top-end"
                        />
                         </label>

                        <label className="input input-bordered flex items-center gap-2" >
                            Organization Email
                            <input type="email" name="userEmail" className="grow" defaultValue={user.email ? user.email : ''} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            Organization name
                            <input type="text" name="userName" className="grow" defaultValue={user.email ? user.displayName : ''} />
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Add New Post" className="btn bg-blue-500 text-white w-full" />
                </div>
            </form>
        </div>
    );
};

export default AddPost;