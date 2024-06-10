/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider"; // Assuming AuthContext provides user information
import Ivolunteer from "./Ivolunteer";

const Myvolunteerreq = () => {
    useEffect(() => {
        document.title = "My Volunteer"
    }, []);
    const list = useLoaderData();
    // console.log(list);

    return (
        <div className="flex flex-col ">
            {
                list.length > 0 ? (
                    list.map((data, index) => <Ivolunteer key={data._id} post={data} index={index}></Ivolunteer>)
                ) : (
                    <div className="w-screen h-[600px] flex flex-col justify-center"><p className="text-center text-4xl">No data found</p></div>
                )
            }
        </div>
    );
};

export default Myvolunteerreq;
