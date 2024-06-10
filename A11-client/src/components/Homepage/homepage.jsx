import  { useRef, useEffect  } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from "../../Shared/ItemCard/ItemCard2";
import ItemCardCategory from "../../Shared/ItemCard/ItemCardCategory";
import {Link,  useLoaderData } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'
import { Fade } from "react-awesome-reveal";
import Whychooseus from '../whychooseus/whychooseus';
import Map from '../map/map';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './homepage.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const HomePage = () => {
  useEffect(() => {
    document.title = 'IVolunteer';
  }, []);
  const posts = useLoaderData();
  const { categoryResult , postResult } = posts;
    const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
    return (
        <div>
              <div className='lg:h-[700px]'>
              <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide ><div className='bg-blue-400 h-full w-full'><img src="https://www.oceans-research.com/wp-content/uploads/2022/01/Short-term.jpg" alt="" /></div></SwiperSlide>
        <SwiperSlide><img src="https://cdnsm5-ss18.sharpschool.com/Userfiles/Servers/Server_691169/Image/SavedfromPages/volunteer_16461.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://mypickle.org/image%20(6).webp" alt="" /></SwiperSlide>
 
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
                   
      </div>
      <div>
      <div  className="font-bold text-5xl p-3 text-center my-10"><Fade> <h2>About IVolunteer</h2></Fade></div>
<div className=' text-center m-20 text-xl'><p><Fade><div>
     
      <p>
        At IVolunteer, we believe in the power of volunteerism to create positive change in communities around the world. Our organization is dedicated to connecting passionate individuals with meaningful volunteer opportunities that align with their interests and skills.
      </p>
      <br/>
      <p>
        Founded with the mission of fostering social impact through collective action, IVolunteer serves as a bridge between volunteers and organizations in need of support. Whether you're passionate about environmental conservation, education, healthcare, or social justice, IVolunteer provides a platform for you to make a difference in causes that matter to you.
      </p><br/>
      <p>
        Our platform offers a diverse range of volunteer opportunities, from local community initiatives to international projects, allowing volunteers to contribute their time and talents wherever they're needed most. By harnessing the collective power of volunteers, we strive to address pressing social, environmental, and humanitarian challenges, one act of service at a time.
      </p><br/>
      <p>
        At IVolunteer, we prioritize transparency, integrity, and inclusivity in everything we do. We work closely with partner organizations to ensure that volunteer experiences are rewarding, impactful, and enriching for both volunteers and the communities they serve.
      </p><br/>
      <p>
        Join us in our mission to create a world where everyone has the opportunity to contribute positively to society. Together, we can make a difference and build a brighter future for generations to come.
      </p>
    </div></Fade></p></div>
      </div>
     
      <div  className="font-bold text-5xl p-3 text-center my-10"><Typewriter
            words={['Need a Volunteer', 'Need a Volunteer','Need a Volunteer','Need a Volunteer','Need a Volunteer','Need a Volunteer', ]}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={5}
            
          /></div>
       <div className="flex flex-col">
      {
          postResult.slice(0, 6).map(post => <ItemCard key={post._id} post={post}></ItemCard>)
      }
      </div>
      <div className="flex  flex-wrap justify-center gap-5 w-full"><Link to={'/allposts'} className="btn btn-wide  bg-blue-300 text-black">See All</Link></div>
      <div  className="font-bold text-5xl p-3 text-center my-10">Volunteer Fields</div>
      <div className="flex  flex-wrap justify-center gap-5 w-full">
          {
              categoryResult.map(category => <div className='hover:scale-105 transition duration-300 ease-in-out' key={category._id} >
                  <ItemCardCategory category={category}></ItemCardCategory>
              </div>)
          }
      </div>
      <div  className="font-bold text-5xl p-3 text-center my-10">
      <Whychooseus></Whychooseus>
      </div>
      <div className='text-4xl font-bold text-center  my-8'>Our Branches in the World </div>
      <div  className="flex  flex-wrap justify-center my-10"> <Map></Map></div>
        </div>
    );
};

export default HomePage;
