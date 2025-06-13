import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);



function Video({url}) {
    const videoref=useRef(null);

       useGSAP(()=>{
        gsap.from(videoref.current,{
            opacity:0,
            duration:1,
            scale:0.8,
            scrollTrigger:{
                trigger:videoref.current,
                scroller:"body",
                scrub:2,
                start:"top 50%",
                end:"top 40%"
            }
        })

    },[]);


    return (
        <div  className=" w-[80%] rounded-2xl max-w-[28rem] outline-none ">
            <video ref={videoref}  className=" h-full w-full rounded-2xl border-none outline-none object-cover" src={url} muted
                playsInline autoPlay loop></video>
        </div>

    )
}
export default Video;