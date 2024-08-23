import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constant'
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCrousel = () => {
    const videoRef=useRef([]);
    const videoDivRef=useRef([]);
    const videoSpanRef=useRef([]);

    const [video,setVideo]=useState({
        isEnd:false,
        startPlay:false,
        videoId:0,
        isPlaying:false,
        isLastVideo:false
    });

    const [loaded,setLoaded]=useState([]);
    const {isEnd,startPlay,videoId,isPlaying,isLastVideo}=video;

    // gsap animation
    useGSAP(()=>{

        gsap.to("#slides",{
            transform:`translate(${-100 * videoId}%)`,
            duration:2,
            ease:"power2.inOut"
        })


        gsap.to("#video",{
            scrollTrigger:{
                trigger:'#video',
                toggleActions:"restart none none none"
            },
            onComplete:()=>{
                setVideo((prev)=>({
                    ...prev,
                    isPlaying:true,
                    startPlay:true
                }))
            }
        })

    },[isEnd,videoId])

    useEffect(()=>{
        if(loaded.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            }
            else{
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[videoId,startPlay,isPlaying,loaded])


    useEffect(()=>{
        let currentProgress=0;
        const span=videoSpanRef.current;

        if(span[videoId]){
            const animtate=gsap.to(span[videoId],{
                onUpdate:()=>{
                    const progress= Math.ceil(animtate.progress() * 100)

                    if(progress != currentProgress){
                        currentProgress=progress;

                        gsap.to(videoDivRef.current[videoId],{
                            width:window.innerWidth < 760 ? "10vw":
                                  window.innerWidth < 1200 ? "10vw":
                                  "4vw"
                        });

                        gsap.to(span[videoId],{
                            width:`${currentProgress}%`,
                            backgroundColor:"white"
                        })
                    }
                },
                onComplete:()=>{
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoId],{
                            width:'12px'
                        }),

                        gsap.to(span[videoId],{
                            backgroundColor:"#afafaf"

                        })
                    }
                }
            })
            
            if(videoId===0){
                animtate.restart()
            }

            const animtateUpdate=()=>{
                animtate.progress(videoRef.current[videoId].currentTime/hightlightsSlides[videoId].videoDuration)
            }

            if(isPlaying){
                gsap.ticker.add(animtateUpdate)
            }
            else{
                gsap.ticker.remove(animtateUpdate)
            }
        }
    },[videoId,startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
          case "video-end":
            setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
            break;
    
          case "video-last":
            setVideo((pre) => ({ ...pre, isLastVideo: true }));
            break;
    
          case "video-reset":
            setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
            break;
    
          case "pause":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;
    
          case "play":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;
    
          default:
            return video;
        }
      };
    
      const handleLoadedMetaData = (i,e) => setLoaded((pre) => [...pre, e]);

  return (
    <>
    <div className='flex items-center'>
        {hightlightsSlides.map((slides,idx)=>(
            <div id='slides' key={slides.id} className='sm:pr-20 pr-10'>
                <div className='video-carousel_container p-2'>
                    
                    <div className='w-full h-full bg-black flex-center overflow-hidden rounded-3xl'>
                        <video autoPlay muted preload="true"
                             ref={(el)=>(videoRef.current[idx]=el)} 
                             onPlay={()=>setVideo((prev)=>({
                                ...prev,isPlaying:true
                            }))}
                            onEnded={() =>
                                idx !== 3
                                  ? handleProcess("video-end",idx)
                                  : handleProcess("video-last")
                              }
                            onLoadedMetadata={(e)=>setLoaded(idx,e)} 
                            id="video"
                            >
                            <source src={slides.video} type='video/mp4'/>
                        </video>
                    </div>

                    <div className='absolute top-12 left-[6%] z-10'>
                        {
                            slides.textLists.map((text,idx)=>(
                                <p key={idx} className='md:text-2xl text-xl font-medium'>{text}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className=' relative flex-center mt-10'>
        <div className='flex-center py-5 px-8 bg-gray-300 backdrop-blur rounded-full'>
                {
                    videoRef.current.map((_,idx)=>(
                        <span className='mx-2 w-3 h-3 relative bg-gray-50 rounded-full cursor-pointer'
                        ref={(el)=>(videoDivRef.current[idx]=el)} 
                        key={idx}>
                    
                    <span className='absolute h-full w-full rounded-full'
                     ref={(el)=>(videoSpanRef.current[idx]=el)} 
                     key={idx}/>
                    </span>
                    ))
                }
        </div>
        <button className='control-btn'>
            <img src={isLastVideo?replayImg:!isPlaying?playImg:pauseImg}
            onClick={isLastVideo?()=>handleProcess('video-reset'):
                      !isPlaying?()=>handleProcess('play'):
                                 ()=>handleProcess("pause")
            }/>
        </button>
    </div>
    
    </>
  )
}

export default VideoCrousel
