import React, { useEffect, useRef, useState } from 'react'
import { RiSearchLine } from "react-icons/ri";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import Topimages from './Topimages';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FaTemperatureHigh } from "react-icons/fa6";
import { RiCelsiusFill } from "react-icons/ri";
import { MdOutlineCloudCircle } from "react-icons/md";

function App() {
  const[weatherdata,setweatherdata]=useState(' ')
  const[current,setcurrent]=useState(' ')
  const[input,setinput]=useState('')
  const[gettingdays,setdays]=useState([])
  const[nextforecast,setnextforecast]=useState(false)
  const forecastref=useRef()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const nextforecasthandler=()=>{
    setTimeout(() => {
      if (forecastref.current) {
        forecastref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
   
    setnextforecast(!nextforecast) 
   
  }
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };


  const apidata=async()=>{
    try{
      const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=V5PKTJMAA4ZCQNSLJQ3T8W3QJ&contentType=json`)
      const data= await response.json()
      setcurrent(data)
      const {days}=data
      const{currentConditions}= data
setweatherdata(currentConditions)      
setdays(days)
      
    }catch(error){
console.error("error in fetching data")
    }
    
  }
  

console.log("days", gettingdays)

console.log(current)


  return (
  <div onMouseMove={handleMouseMove} className='w-full h-[100vh] md:h-[300vh] bg-gradient-to-t gap-[15vh] from-slate-800 via-blue-800 to-slate-800 flex flex-col items-center text-zinc-100 relative'>
          <div className='w-[1vw] h-[2vh] rounded-full bg-[rgba(255,255,255,.3)]' style={{ position: 'absolute', left: cursorPosition.x, top: cursorPosition.y }}></div>
          

  <div className='bg-blue-700 shadow-2xl md:w-[85vw] md:h-[92vh] md:mt-[6vh] rounded-xl flex items-center'>
{/* image section starts here */}
<div className='bg-zinc-800 flex overflow-hidden md:h-[85vh] md:w-[57%] rounded-tl-xl rounded-bl-xl md:ml-[1.8vw] border-r-2 border-zinc-200 relative'>
  <Topimages/>


  <div className='w-[20vw] h-[21vh] flex flex-col items-end justify-end absolute z-20 top-[6vh] uppercase right-8'>
  <h1 className='font-semibold text-[3vw]'>{current.address}</h1>
  <h2>{current.resolvedAddress}</h2> 
  </div>




<div className='absolute z-20 text-white top-[64vh]  right-2 uppercase  flex md:h-[15vh]  md:w-[12vw]'>
<h1 className='text-[5vw] mt-1'>{weatherdata.temp}</h1>
<div className='w-[1.1vw] h-[2vh] border-2 rounded-full mt-7 ml-2'></div>
<p className='ml-0 text-[2vw] mt-[7vh] '>c</p>

</div>
<div className='absolute z-20 text-white md:left-[4vw] md:top-[67vh]'>
  <h1 className='md:text-[2.6vw]'>{currentTime.toLocaleTimeString()}</h1>
  <p>{formatDate(currentTime)}</p>
</div>
<button className='absolute bottom-4 rounded-xl shadow-2xl w-[11vw] right-3 bg-[rgba(255,255,255,0.1)] text-white ' onClick={nextforecasthandler}>See 15 days forcast</button>
</div>

       
        {/* image section ends here */}
        <div className='bg-blue-900 text-white md:w-[39%] h-[85vh] rounded-tr-xl flex flex-col items-center justify-around rounded-br-xl'>
        <div className=' md:w-[28vw] md:h-[25vh] border-b-2 border-slate-200  relative flex justify-around'>
        <FiSunrise className='text-[6vw]' />
        <FiSunset   className='text-[6vw]'/>
        <h1 className='absolute text-white top-[15vh] left-[5vw] text-lg'>{weatherdata.sunrise}</h1>
        <h1 className='absolute text-white top-[15vh] left-[19vw] text-lg'>{weatherdata.sunset}</h1>
        </div>
        <input className=' md:h-[6vh] md:text-lg md:w-[22vw] text-white bg-blue-900 px-20 border-b-2 border-slate-200 font-semibold hover:border-2 hover:border-white' value={input} onChange={(e)=>setinput(e.target.value)} placeholder='Search for a city'/>
        <button className='absolute h-[5vh] w-[2.5vw] rounded-full md:top-[39vh] md:left-[78vw] px-2 bg-blue-800' onClick={apidata}><RiSearchLine  className='md:text-2xl'/></button>
        <p className='md:w-[28vw] bg-blue-900 md:h-[6vh] border-b-2 border-slate-200 md:text-lg flex items-center justify-center font-semibold'>{weatherdata.conditions}</p>
        <div className='bg-blue-900 md:w-[28vw] md:h-[24vh]  flex'>
          <div className='bg-blue-900 md:w-[50%] md:h-[100%] flex flex-col md:text-lg font-semibold'>
          <h1 className='md:h-[6vh] border-b-2  border-slate-200 flex items-center px-8'>Temperature</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center px-8 '>Humidity</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center px-8'>Visibility</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center px-8'>Wind Speed</h1>
          </div>
          <div className='bg-blue-900 md:w-[50%] md:h-[100%] flex flex-col md:text-lg'>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center justify-center'>{weatherdata.temp} c</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center justify-center'>{weatherdata.humidity}%</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center justify-center'>{weatherdata.visibility}km</h1>
          <h1 className='md:h-[6vh] border-b-2 border-slate-200 flex items-center justify-center'>{weatherdata.windspeed}km</h1>
          </div>
         
        </div>
        <p className='md:w-[28vw] text-white bg-blue-900 md:h-[10vh] px-8 border-b-2 py-5 border-zinc-200'>Description : {current.description}</p>
        </div>
        </div>
     {nextforecast ?(<div ref={forecastref} className='md:w-full flex flex-col items-center justify-center md:h-[120vh] '>
     <FaArrowDown className='absolute top-[97vh] animate-bounce' />
<p className='md:text-[3vw] md:w-[50vw] flex'>15 days forecast in your area <TiWeatherPartlySunny className='text-[3.5vw] mt-2 ml-5'  /></p>
<div className=' w-full flex items-center justify-center mt-[8vh] h-[100vh] bg-orange-300 relative'>
  <div className='absolute z-20 w-full h-full'>
  <video autoplay loop muted>
        <source src='https://videos.pexels.com/video-files/855679/855679-hd_1920_1080_30fps.mp4' type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
      </video>
    </div>

  <ul className='absolute z-40 flex w-full flex-wrap items-center justify-center gap-4 mt-[18vh]'>{gettingdays.map((items)=>(
    
 <motion.li  className='  w-[20vw] h-[22vh] gap-2 bg-sky-500 font-semibold text-lg flex flex-col items-center justify-center px-4 rounded-xl text-white shadow-2xl' key={items.datetime}>
  <h1> {items.datetime}</h1>
  <FaTemperatureHigh className='text-2xl' /> 
  <div className='text-[2.5vw] w-[10vw] items-center justify-center flex'><h1>{items.temp}</h1> <RiCelsiusFill className='text-[2vw]'/></div>
  
  <h1>Condition : {items.conditions}</h1>
  
  
  </motion.li>
  ))}
   
  </ul>
</div>
     </div>):(<h1>false</h1>)}   
        

</div>

  )
}

export default App