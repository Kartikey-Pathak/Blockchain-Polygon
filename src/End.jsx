import { div } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);


function End(){
    const vidref=useRef(null);

      useGSAP(()=>{
        gsap.from(vidref.current,{
            opacity:0,
            duration:1,
            scale:0.8,
            scrollTrigger:{
                trigger:vidref.current,
                scroller:"body",
                scrub:2,
                start:"top 50%",
                end:"top 40%"
            }
        })

    },[]);




    return(
        <div className=" w-full max-w-full h-[30rem] mt-10 flex justify-center items-center">
            <div className=" w-[95%] h-[90%] rounded-4xl">
                <video ref={vidref} className="h-full w-full rounded-2xl border-2 border-white/10 object-cover" src="https://polytech-assets.polygon.technology/videos/homepage/newsletter.mp4" autoPlay loop playsInline muted></video>
            </div>
        </div>
    )
}
export default End;