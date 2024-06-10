import { useLoaderData } from "react-router-dom";
import ItemCard from "../../Shared/ItemCard/ItemCard";
import { useEffect, useState } from "react";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";
import { Link } from "react-router-dom";

const AllPosts = () => {
    useEffect(() => {
        document.title = "All Volunteer Posts";
    }, []);

    const loaderPosts = useLoaderData();
    const [posts, setPosts] = useState(loaderPosts);
    const [isTableLayout, setIsTableLayout] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSortA = () => {
        fetch('https://a11-server-sigma.vercel.app/allPosts/a')
            .then(res => res.json())
            .then(data => setPosts(data));
    };

    const handleSortD = () => {
        fetch('https://a11-server-sigma.vercel.app/allPosts/d')
            .then(res => res.json())
            .then(data => setPosts(data));
    };

    const handleClick = () => {
        setIsTableLayout(!isTableLayout);
    };
    const handleSearch = () => {
        // Filter the posts based on the searchTerm
        const filteredPosts = loaderPosts.filter(post =>
            post.item_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPosts(filteredPosts);
    };

    useEffect(() => {
        // Reset posts to original data when searchTerm is empty
        if (searchTerm === "") {
            setPosts(loaderPosts);
        } else {
            handleSearch();
        }
    }, [searchTerm]);


    return (
        <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3 items-center mb-5">
                <h1 className="font-bold text-6xl">All Volunteer Posts</h1>
                <div className="flex flex-row justify-center items-center">
                    <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                    {/* <details className="dropdown">
                        <summary className="m-1 btn text-2xl">Sort by Average Price</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSortA}>Low To High</button></li>
                            <li><button onClick={handleSortD}>High To Low</button></li>
                        </ul>
                    </details> */}
                    <button onClick={handleClick}>
                        {isTableLayout ? <RiLayoutGrid2Fill className="w-10 h-10" />
 : <LuLayoutList className="w-10 h-10" />
}
                    </button>
                </div>
                {isTableLayout ? (
                                    <table className="table w-screen">

                        <thead>
                            <tr>
                           
                            <th className="text-lg">Image</th>
                            <th className="text-lg">Item Name</th>
                            <th className="text-lg">Category</th>
                            <th className="text-lg">Location</th>
                            <th className="text-lg">Description</th>
                            <th className="text-lg">number of volunteers</th>
                            <th className="text-lg">Dead_line</th>
                            <th className="text-lg">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                             <tr key={post._id}>
                             <td><img src={post.image} alt='User' className='h-20 w-20 mr-2' /></td>
                             <td>{post.item_name}</td>
                             <td>{post.subcategory_Name}</td>
                             <td>{post.loca_tion}</td>
                             <td>{post.shortDescription}</td>
                             <td>{post.no_volunteer}</td>
                             <td>{post.Dead_line}</td>
                             <td>                <Link to={`/post/${post._id}`} className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 ">View Details</Link>
</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {posts.map(post => <ItemCard key={post._id} post={post}  className=""></ItemCard>)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPosts;
