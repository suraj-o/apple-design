import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCrousel from '../components/VideoCrousel'

const HeighLight = () => {
// Gsap animation

useGSAP(()=>{
gsap.to("#title",{opacity:1,y:0});
gsap.to(".link",{opacity:1,y:0});
},[])

  return (
    <section id='heighlight' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
        <div className='screen-max-width'>
            <div className=' w-full md:flex items-center justify-between'>
                
                <h1 id='title'className='section-heading capitalize md:mb-10'>
                    get the heighlights.
                </h1>

                <div className='flex flex-wrap items-end'>
                  <p className='link'>watch film 
                    <img src={watchImg} alt='watch-film' className='ml-1'/>
                  </p>

                  <p className='link ml-3'>watch film 
                    <img src={rightImg} alt='right-arrow' className='ml-1'/>
                  </p>
                </div>
                
            </div>
                <VideoCrousel/>
        </div>

    </section>
  )
}

export default HeighLight
