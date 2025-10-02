import { div } from "framer-motion/client";
import { useRef, useState } from "react";
import VideoText from "./VideoText";
import Video from "./Video";
import VideoButton from "./VideoButton";
import { texts1,texts2,url } from "./data/InfoVisualContent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function InfoVisual() {
    const btnref=useRef(null)
      //Animation for UI/UX Button
      useGSAP(()=>{
        gsap.from(btnref.current,{
            opacity:0,
            duration:1,
            scale:0.8,
            scrollTrigger:{
                trigger:btnref.current,
                scroller:"body",
                scrub:2,
                start:"top 90%",
                end:"top 40%"
            }
        })
    },[]);


    useGSAP(()=>{
        gsap.from("#gen",{
            opacity:0,
            duration:1,
            scale:0.7,
            scrollTrigger:{
                trigger:"#gen",
                scroller:"body",
                scrub:2,
                start:"top 90%",
                end:"top 40%"
            }
        })
    },[]);

    const [live, islive] = useState(true);
    
    return (
        <div className="w-full max-w-screen h-fit mt-3 flex  items-center gap-y-10 flex-col">
            {/* Heading*/}
            <h1 id="gen" className=" text-[6vw] text-white font-bold">Next-Gen Crypto Dashboard</h1>

            {/* the button ui part */}
            <div ref={btnref} className=" bg-white/10 rounded-4xl backdrop-blur-2xl shadow h-12 w-[60%] max-w-64 border-2 flex items-center flex-row ">
                <div className={`rounded-4xl h-full w-[40%] hover:bg-white/80 cursor-pointer shadow ${live ? "bg-white" : "bg-transparent"} flex justify-center items-center transition-all ease-in-out duration-200`} onClick={() => islive(true)}>
                    <h1 className={`${live ? "text-black" : "text-white"} font-bold`}>Live</h1>
                </div>
                <div className={`rounded-4xl h-full w-[60%] hover:bg-white/80 cursor-pointer ${!live ? "bg-white" : "bg-transparent"} flex justify-center items-center transition-all ease-in-out duration-200`} onClick={() => islive(!live)}>
                    <h1 className={`${!live ? "text-black" : "text-white"} font-bold`}>UI/UX</h1>
                </div>
            </div>

            {/* Dynamic part */}
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-items-center ">
                {/* video's text part */}
                <VideoText heading={live ? texts1.heading : texts2.heading} sub={live ? texts1.sub : texts2.sub} />
                {/* Video Part */}
                <Video url={live ? url.url1 : url.url2} />
            </div>
            {/* Video Button Links */}
            <VideoButton heading1="Prices" heading2="About" url1="" url2="" />


            {/* the 2nd Video Part */}

            <div className=" w-full grid grid-cols-1 md:grid-cols-2 items-center justify-items-center ">
                {/* video's text part */}
                <VideoText heading="Explore" sub="Dive into the code or connect with me professionally.Track top crypto coins in real-time with a clean, responsive interface. Made for clarity.Track top crypto coins in real-time with a clean, responsive interface — built for clarity and speed.
Dive into the code or connect with me professionally. Powered by the CoinGecko API and crafted with React + Vite." />
                {/* Video Part */}
                <Video url="https://polytech-assets.polygon.technology/videos/solutions/Miden.mp4.mp4" />
            </div>
            <VideoButton heading1="GitHub" heading2="Linkedln" url1="https://github.com/Kartikey-Pathak" url2="https://www.linkedin.com/in/kartikey-pathakb580297/" />
        </div>
    )
}
export default InfoVisual;