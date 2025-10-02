import { useGSAP } from "@gsap/react";
import { div } from "framer-motion/client";
import gsap from "gsap";
import { Link } from "react-router-dom";
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
        <div className="w-full max-w-screen h-[30rem] mt-3 flex justify-center items-center flex-col gap-5 md:gap-16">
            
                 <Link className=" mt-10 md:mt-32 w-[90%] md:w-[60%] lg:w-[32%] max-w-screen flex justify-center items-center" to="/prices">
                        <div className=" h-12 w-[50%] bg-[#6154F3] hover:shadow-2xl hover:backdrop-blur-xl hover:shadow-[#6154F3] cursor-pointer transition-all rounded-4xl flex justify-evenly items-center ">
                            <h1 className=" text-white font-bold md:text-xl" >Live Prices</h1>
                            <i class="fa-solid fa-arrow-right font-light text-md md:text-xl -rotate-z-45"></i>

                        </div>
                    </Link>
          
            <div className="h-[80%] w-[80%] rounded-2xl border-none outline-none mb-20">
            <video id="vid" className=" h-full w-full rounded-2xl border-none outline-none object-cover"  src={source} muted 
                playsInline autoPlay loop></video>
                </div>

        </div>
    )
}
export default Visual;