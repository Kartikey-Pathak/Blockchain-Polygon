import { head } from "framer-motion/client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Card({heading,sub,img,url}){
    const cardref=useRef(null);

      useGSAP(()=>{
        gsap.from(cardref.current,{
            opacity:0,
            duration:1,
            scale:0.7,
            scrollTrigger:{
                trigger:cardref.current,
                scroller:"body",
                scrub:2,
                start:"top 70%",
                end:"top 90%"
            }
        })

    },[]);


    const [hoverd,ishoverd]=useState(false);
    return(
             <div ref={cardref} className={` w-[90%] flex flex-col bg-[#131117] ${hoverd?"brightness-110 shadow-black shadow-2xl backdrop-blur-4xl scale-105 relative z-30 duration-200 transition-all ease-in-out":null} cursor-pointer h-[26rem] border-2 border-white/3 rounded-2xl`}
              onMouseEnter={()=>{ishoverd(true)}}
              onMouseLeave={()=>{ishoverd(false)}}
             >
                    {/* image */} 
                    <div className=" size-64">
                        <img className=" object-cover" src={img} alt="" />
                    </div>
                    {/* texts */}
                    <div className=" m-5 flex-col gap-y-2 flex">
                        <h1 className=" text-white font-bold text-xl">{heading}</h1>
                        <h3 className=" text-white/40 text-sm font-medium">{sub}</h3>
                        {/* link */}
                        <a href={url} className={` ${hoverd?"text-purple-500":"text-white"} mt-3 font-medium text-md cursor-pointer`}>View   <i className="fa-solid fa-arrow-right font-light text-md md:text-xl -rotate-z-45"></i></a>
                    </div>

                </div>
    )
}
export default Card;