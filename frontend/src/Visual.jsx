import { useGSAP } from "@gsap/react";
import { div } from "framer-motion/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Visual({source}){
    useGSAP(()=>{
             gsap.from("#vid",{
                opacity:0.2,
                scale:0.7,
                duration:0.5,
                scrollTrigger:{
                    trigger:"#vid",
                    scroller:"body",

                    start:"top 90%",
                    end:"top 30%",
                    scrub:2

                }
             })
             
    },[])
    return(
        <div className="w-full max-w-screen h-[30rem] mt-3 flex justify-center items-center">
            <div className="h-[80%] w-[80%] rounded-2xl border-none outline-none">
            <video id="vid" className=" h-full w-full rounded-2xl border-none outline-none object-cover"  src={source} muted 
                playsInline autoPlay loop></video>
                </div>

        </div>
    )
}
export default Visual;