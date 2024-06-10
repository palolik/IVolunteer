import { useLoaderData } from "react-router-dom";
import ItemTable from "../../Shared/ItemCard/ItemTable";
import { useEffect } from "react";


const MyList = () => {
    useEffect(()=>{
        document.title = "My list"
    },[])
    const list = useLoaderData();
    // console.log(list);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 h-screen ">
            <div className="overflow-x-auto mx-auto">
                <table className="table w-screen">
                    <thead>
                        <tr>
                            <th className="text-lg">Sl</th>
                            <th className="text-lg">Image</th>
                            <th className="text-lg">Item Name</th>
                            <th className="text-lg">Category</th>
                            <th className="text-lg">Location</th>
                            <th className="text-lg">Description</th>
                            <th className="text-lg">number of volunteers</th>
                            <th className="text-lg">Dead_line</th>
                            <th className="text-xl text-center" colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((data,index) => <ItemTable key={data._id} post={data} index={index}></ItemTable>)
                        }

                    </tbody>
                </table>
            </div>
          
        </div>
    );
};

export default MyList;