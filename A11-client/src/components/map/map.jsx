import  { useState } from 'react';

import worldMap from '../../assets/world.svg'
import { IoIosLocate } from "react-icons/io";





const Map = () => {

  const [hoverStates, setHoverStates] = useState({
    icon1: false,
    icon2: false,
    icon3: false,
    icon4: false,
  });

  const handleMouseEnterIcon = (iconId) => {
    setHoverStates({ ...hoverStates, [iconId]: true });
  };

  const handleMouseLeaveIcon = (iconId) => {
    setHoverStates({ ...hoverStates, [iconId]: false });
  };

    return (
        <div className=' lg:h-[500px] lg:w-[1200px] flex flex-col overflow-x-auto items-center justify-center my-3'>
           
            
            <div className="relative  h-[500px] w-[1200px] "> 
            <img src={worldMap} alt="World Map - Technologies We Offer" className="h-[500px] w-[1200px] absolute top-0 left-0" />
            <div className="h-500 w-1200 relative top-0 left-0 z-40">
          <IoIosLocate
            onMouseEnter={() => handleMouseEnterIcon('icon1')}
            onMouseLeave={() => handleMouseLeaveIcon('icon1')}
            className="h-6 w-6 relative inline-block text-blue-700 top-[180px] left-[880px] "
          />
            {hoverStates.icon1 && (
              <div className="tooltip absolute flex flex-row justify-start items-center bg-white shadow-xl rounded-lg top-[100px] z-[20]  left-[810px] h-20 w-60">
              
                      <div className='flex flex-col ml-2 justify-center items-start'>
               
                <div className='text-sm font-bold'>Bangladesh</div>
                <div className='text-sm '>main branch</div>
              </div>
              

              </div>
            )}

            <IoIosLocate
              onMouseEnter={() => handleMouseEnterIcon('icon2')} onMouseLeave={() => handleMouseLeaveIcon('icon2')}
              className="h-6 w-6 relative inline-block text-blue-700 top-[200px] left-[820px] "
            />
            {hoverStates.icon2 && (
              <div className="tooltip absolute flex flex-row justify-start items-center bg-white shadow-xl rounded-lg top-[200px] z-[20]  left-[900px] h-20 w-60">
               
                    <div className='flex flex-col ml-2 justify-center items-start'>
             
              <div className='text-sm font-bold'>India</div>
              <div className='text-sm '>2nd branch</div>
            </div>
            

            </div>
            )}
              <IoIosLocate
              onMouseEnter={() => handleMouseEnterIcon('icon3')} onMouseLeave={() => handleMouseLeaveIcon('icon3')}
              className="h-6 w-6 relative inline-block text-blue-700 top-[200px] left-[600px] "
            />
            {hoverStates.icon3 && (
              <div className="tooltip absolute flex flex-row justify-start items-center bg-white shadow-xl rounded-lg top-[200px] left-[680px] z-[20] h-20 w-60">
               
                    <div className='flex flex-col ml-2 justify-center items-start'>
             
              <div className='text-sm font-bold'>German</div>
              <div className='text-sm '>3rd branch</div>
            </div>
            

            </div>
            )}
              <IoIosLocate
              onMouseEnter={() => handleMouseEnterIcon('icon4')} onMouseLeave={() => handleMouseLeaveIcon('icon4')}
              className="h-6 w-6 relative inline-block text-blue-700 top-[130px] left-[840px] "
            />
            {hoverStates.icon4 && (
              <div className="tooltip absolute flex flex-row justify-start items-center bg-white shadow-xl rounded-lg top-[160px] z-[20]  left-[900px] h-20 w-60">
               
                    <div className='flex flex-col ml-2 justify-center items-start'>
             
              <div className='text-sm font-bold'>Chaina</div>
              <div className='text-sm '>4th branch</div>
            </div>
            

            </div>
            )}
          </div>
            </div>
            </div>
       
      )
};

export default Map;