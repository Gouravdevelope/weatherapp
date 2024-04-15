import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import { useState,useEffect } from 'react';


function Cloudimages() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
     'https://media.istockphoto.com/id/1281517761/photo/bright-stars-and-milky-way-at-night.jpg?s=612x612&w=0&k=20&c=7shsxGLjxESVR-86oqX7AZPaPap8zlTdpPn2zlRrPyc=',
    'https://media.istockphoto.com/id/1202974826/vector/navy-classic-blue-color-christmas-winter-texture-with-clouds.jpg?s=612x612&w=0&k=20&c=Bz3apjwtW_Vq3FUg9WAc1Krj4ufgCpcDv0fuO0CQ4o8=',
      'https://images.unsplash.com/photo-1483401757487-2ced3fa77952?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJsdWUlMjBza3l8ZW58MHx8MHx8fDA%3D',
      'https://wallpapergod.com/images/hd/night-sky-1920X1200-wallpaper-ztbbfcndgwabmt7h.jpeg',
      'https://preview.redd.it/simple-night-sky-1920x1080-v0-c1h31gxe6j0b1.jpg?width=1080&crop=smart&auto=webp&s=8ad77fa4ddac01b3b409d0b21d035e24691ad742'
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
    <div className='opacity-90'>
 <AnimatePresence initial={false}>
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="absolute w-full h-full object-cover  "
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={handlePrev}
      >
         &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={handleNext}
      >
        &gt;
      </button>

    </div>
  )
}

export default Cloudimages