import React, { useEffect, useRef, useState } from 'react'
import { RiSearchLine } from "react-icons/ri";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import Topimages from './Topimages';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { motion,useScroll } from 'framer-motion';
import { FaTemperatureHigh } from "react-icons/fa6";
import { RiCelsiusFill } from "react-icons/ri";


function App() {
  const { scrollYProgress } = useScroll();
  const[weatherdata,setweatherdata]=useState(' ')
  const[current,setcurrent]=useState(' ')
  const[input,setinput]=useState('')
  const[gettingdays,setdays]=useState([])
  const[nextforecast,setnextforecast]=useState(false)
  const forecastref=useRef()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.pageX, y: event.pageY });
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
  <div onMouseMove={handleMouseMove} className='w-full h-[150vh] md:h-[300vh] bg-gradient-to-t gap-[15vh] from-slate-800 via-blue-800 to-slate-800 flex flex-col items-center text-zinc-100'>
  <div className='w-[1vw] z-50 h-[2vh] rounded-full bg-[rgba(255,255,255,.3)]' style={{ position: 'fixed', left: cursorPosition.x, top: cursorPosition.y }}></div>
       

<div className='bg-blue-700 shadow-[0_40px_60px_-10px_rgba(95,0,160,0.4)] md:w-[85vw] md:h-[92vh] md:mt-[6vh] w-[88%] h-[100vh] rounded-xl md:flex md:flex-row items-center mt-[2vh] md:gap-0 gap-10 flex flex-col'>
{/* image section starts here */}
<div className='bg-zinc-800 flex overflow-hidden md:h-[85vh] md:w-[57%] w-[85vw] h-[45vh] rounded-lg md:rounded-tl-xl md:rounded-bl-xl md:ml-[1.8vw] md:border-r-2 border-zinc-200 relative md:mt-0 mt-5'>
  <Topimages/>


  <div className='w-[20vw] h-[21vh] flex flex-col items-end justify-end absolute z-20 md:top-[6vh] uppercase right-8'>
  <h1 className='font-semibold text-3xl md:text-[3vw]'>{current.address}</h1>
  <h2>{current.resolvedAddress}</h2> 
  </div>




<div className='absolute z-20 text-white md:top-[64vh] top-[25vh]  md:right-6 right-8 uppercase  flex md:h-[15vh]  md:w-[12vw]'>
<h1 className='md:text-[5vw] text-[10vw] md:mt-1'>{weatherdata.temp}</h1>
<div className='md:w-[1.1vw] md:h-[2vh] w-3 h-3 border-2 rounded-full md:mt-7 mt-2 ml-2'></div>
<p className='ml-0 md:text-[2vw] mt-7 text-lg md:mt-[7vh] '>c</p>

</div>
<div className='absolute z-20 text-white md:left-[4vw] md:top-[67vh] top-[4vh] left-[5vw]'>
  <h1 className='md:text-[2.6vw]'>{currentTime.toLocaleTimeString()}</h1>
  <p>{formatDate(currentTime)}</p>
</div>
<button className='absolute md:bottom-4 bottom-2 left-5 rounded-xl shadow-2xl md:w-[11vw] w-[30vw] md:left-[34vw] bg-[rgba(255,255,255,0.1)] text-white ' onClick={nextforecasthandler}>See 15 days forcast</button>
</div>

       
        {/* image section ends here */}
        <div className='bg-blue-900 text-white md:w-[39%] md:h-[85vh] h-[60vh] w-full  md:rounded-tr-xl flex flex-col items-center justify-around rounded-lg md:rounded-br-xl'>
        <div className=' md:w-[28vw] md:h-[25vh] border-b-2 border-slate-200  relative flex justify-around'>
        <FiSunrise className='md:text-[6vw] text-[10vw]' />
        <FiSunset   className='md:text-[6vw] text-[10vw]'/>
        <h1 className='absolute text-white md:top-[15vh] md:left-[5vw] top-[6vh] right-[15vw] text-lg'>{weatherdata.sunrise}</h1>
        <h1 className='absolute text-white md:top-[15vh] md:left-[19vw] top-[6vh] left-[15vw] text-lg'>{weatherdata.sunset}</h1>
        </div>
        <input className=' md:h-[6vh] md:mt-0 md:text-lg w-[25vw] md:w-[22vw] text-white bg-blue-900 px-20 border-b-2 mt-6 border-slate-200 font-semibold hover:border-2 hover:border-white' value={input} onChange={(e)=>setinput(e.target.value)} placeholder='Search for a city'/>
        <button className='absolute md:h-[5vh] md:w-[2.5vw] rounded-full top-[62vh] left-[60vw] md:top-[39vh] md:left-[78vw] px-2 bg-blue-800' onClick={apidata}><RiSearchLine  className='md:text-2xl'/></button>
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
     {nextforecast ?(<div ref={forecastref} onMouseMove={handleMouseMove} className='md:w-full flex flex-col items-center justify-center md:h-[120vh]w-full '>
     <div className='w-[1vw] z-50 h-[2vh] rounded-full bg-[rgba(255,255,255,.3)]' style={{ position: 'fixed', left: cursorPosition.x, top: cursorPosition.y }}></div>
     <FaArrowDown className='absolute md:top-[97vh] top-[44vh] animate-bounce' />
<p className='md:text-[3vw] text-2xl md:w-[50vw] flex'>15 days forecast in your area <TiWeatherPartlySunny className='md:text-[3.5vw] text-2xl md:mt-0 mt-2 ml-5'  /></p>
<div className=' w-full flex items-center justify-center mt-[8vh] md:h-[100vh] relative'>
 

<ul className='absolute w-[100vw] py-5 bg-gradient-to-t from-blue-500 to-slate-900 z-40 mt-[110vh] flex md:w-full flex-wrap items-center justify-center gap-4 md:mt-[18vh]'>{gettingdays.map((items)=>(  
<motion.li  className='w-[30vw] h-[20vh] md:w-[20vw] md:h-[25vh]  gap-2 bg-sky-500 font-semibold text-lg flex flex-col items-center justify-center px-4 rounded-xl text-white shadow-[0_30px_50px_-15px_rgba(174,55,225,0.4)]' key={items.datetime}>
  <h1 className='text-sm md:text-lg'> {items.datetime}</h1>
  <FaTemperatureHigh className='text-2xl' /> 
  <div className='text-[2.5vw] w-[10vw] items-center justify-center flex'>
    <h1 className='text-lg md:text-[2vw]'>{items.temp}</h1> <RiCelsiusFill className='text-[2vw]'/></div>
  <h1 className='overflow-hidden'>Condition : {items.conditions}</h1>
  
  
  </motion.li>
  ))}
   
  </ul>
</div>
     </div>):(<h1>false</h1>)}   
    <div className='md:w-[40vw] md:mt-[5vh]  flex items-center justify-center text-white md:h-[12vh] rounded-lg border-sky-200 shadow-[_0_0_2px_#fff,inset_0_0_5px_#08f,0_0_30px_#08f]'>
    <h1 className='md:text-[3vw]'>Thankyou made by Gourav</h1>
    </div>

</div>

  )
}

export default App