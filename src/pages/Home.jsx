import React, { useEffect, useState } from 'react'
import { heroVideo,smallHeroVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
    // states
    const [videoSrc,setVideosrc]=useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
    
    //handling video size for responsiveness by dynamicaly 
    const handleVideoSrc=()=>{
        if(window.innerWidth < 760 ){
            setVideosrc(smallHeroVideo)
        }
        else{
            setVideosrc(heroVideo)
        }
    }
   
    useEffect(() => {
        window.addEventListener("resize",handleVideoSrc)
    
      return () => {
        window.removeEventListener("resize",handleVideoSrc)
      }
    }, [])
    

    // Gsap animations
    useGSAP(()=>{
        gsap.to("#heroTitle",{
            opacity:1,
            delay:1,
            y:30
        });
        
        gsap.fromTo("#buy-btn",{
            y:70,
            opacity:0
        },{
            y:0,
            scrollBehavior:"smooth",
            delay:2.3,
            opacity:1
        });
    },[])

  return (
    <section className='nav-height w-full bg-black relative'>
        <div className='h-5/6 w-full flex-center flex-col'>
            <p id="heroTitle" className='hero-title'>Iphone 15 pro</p>

            <div className='w-9/12 md:w-10/12'>
                <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
                    <source src={videoSrc} type='video/mp4' />
                </video>
            </div>

            <div id='buy-btn' className='flex flex-col items-center'>
                <a id='buyBtn' href='#heighlight' className='btn'>Buy Now</a>
                <p className='text-xl text-gray-100 '>$999 only hurry up</p>
            </div>

        </div>
    </section>
  )
}

export default Home
