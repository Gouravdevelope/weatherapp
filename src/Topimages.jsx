import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import { useState,useEffect } from 'react';


function Topimages() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
     'https://media.istockphoto.com/id/917262756/photo/beautiful-sunset-of-okinawa-prefecture.jpg?s=612x612&w=0&k=20&c=kwme2VivlhOaCPmevZy8UFlCFSz_L-o6XQZNDty69qo=',
    'https://images4.alphacoders.com/285/285256.jpg',
      'https://c4.wallpaperflare.com/wallpaper/338/526/375/sky-hd-1080p-wallpaper-preview.jpg',
      'https://www.pixelstalk.net/wp-content/uploads/images6/Aesthetic-Sky-Wallpaper-HD.jpg',
      'https://wallpapercave.com/wp/wp12626201.jpg',
      'https://getwallpapers.com/wallpaper/full/d/1/c/1404885-free-blue-nature-wallpaper-1920x1440-for-retina.jpg',
      'https://i.pinimg.com/736x/49/f7/b6/49f7b6113ecaca559d74ab503ccf11dd.jpg'
      // Add more image URLs as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds (adjust as needed)
    
        return () => clearInterval(interval);
      }, [images.length]);
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
    

  return (
    <div>
 <AnimatePresence initial={false}>
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="absolute  md:w-[50vw] md:h-[86vh]  object-cover md:rounded-tl-xl w-full h-[40vh] md:rounded-bl-xl rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-lg md:h-[8vh] md:w-[2vw] h-[5vh] w-[4vw] rounded bg-[rgba(225,225,225,0.2)]"
        onClick={handlePrev}
      >
         &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-lg md:h-[8vh] md:w-[2vw] h-[5vh] w-[4vw] rounded bg-[rgba(225,225,225,0.2)]"
        onClick={handleNext}
      >
        &gt;
      </button>

    </div>
  )
}

export default Topimages