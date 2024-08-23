import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import * as THREE from "three" 
import Modelview from '../components/Modelview'
import { yellowImg } from '../utils'
import { Canvas } from '@react-three/fiber'
import { models, sizes } from '../constant'
import { View } from '@react-three/drei'

const Model = () => {

    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
      title: 'iPhone 15 Pro in Natural Titanium',
      color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
      img: yellowImg,
    })
  
    // camera control for the model view
    const cameraControlSmall = useRef(0);
    const cameraControlLarge = useRef(0);

    const small =useRef(new THREE.Group())
    const large =useRef(new THREE.Group())

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(()=>{
        gsap.to("#heading",{y:0,opacity:1})
    })


  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id='heading' className='section-heading'>Take A  View</h1>

            <div className='flex flex-col items-center mt-5'>
                <div className='w-full h-[75vh] md:h-[90vh] relative overflow-hidden'>
                <Modelview 
                    index={1}
                    groupRef={small}
                    gsapType="view1"
                    controlRef={cameraControlSmall}
                    setRotationState={setSmallRotation}
                    item={model}
                    size={size}
                />  

                <Modelview 
                 index={2}
                 groupRef={large}
                 gsapType="view2"
                 controlRef={cameraControlLarge}
                 setRotationState={setLargeRotation}
                 item={model}
                 size={size}
                />
                </div>

                <Canvas className='w-full h-full' style={{position:"fixed",bottom:"0",top:"0",left:"0",right:"0"}}
                eventSource={document.getElementById("root")}>
                  <View.Port/>
                </Canvas>
            </div>
            <div className="mx-auto w-full mb-[-10%]">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Model
