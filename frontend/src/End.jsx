import { div } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);


function End() {
    const vidref = useRef(null);
    const inputRef = useRef(null);
    const [click, setclick] = useState(false);

    useGSAP(() => {
        gsap.from(vidref.current, {
            opacity: 0,
            duration: 1,
            scale: 0.8,
            scrollTrigger: {
                trigger: vidref.current,
                scroller: "body",
                scrub: 2,
                start: "top 50%",
                end: "top 40%"
            }
        })
    }, []);

    const handleClick = () => {
        setclick(!click); // toggle the state first

        gsap.to(inputRef.current, {
            scale: click ? 1 : 1.1, // toggle scale based on click state
            borderColor: !click?"#8b5cf6":"rgba(255, 255, 255, 0.2)",
            duration: 0.1,
            ease: "power2.out",
            transformOrigin: "center center",
        });
    };



    return (
        <div className=" w-full max-w-full h-[30rem] mt-10 flex justify-center items-center relative">
            <div className=" w-[95%] h-[90%] rounded-4xl" onClick={()=>{handleClick()}}>
                <video ref={vidref} className="h-full w-full rounded-2xl border-2 border-white/10 object-cover" src="https://polytech-assets.polygon.technology/videos/homepage/newsletter.mp4" autoPlay loop playsInline muted></video>
            </div>
            <div className="absolute z-30 left-5 md:left-20 flex items-center justify-center w-[90%] md:w-[40vw]">
                <input ref={inputRef} type="text" id="txt" onClick={() => { handleClick(); setClick(!click); }} placeholder="FeedBack" className={`p-3 outline-none hover:border-white/40 text-xl font-medium transition-all cursor-pointer m-5  md:m-10 border-2 border-white/20 bg-black rounded-xl h-16 w-64 md:w-72`} />
                <div onClick={()=>{alert("Feature Will Be Added Soon...")}} className=" cursor-pointer hover:bg-white/70 transition-all flex items-center justify-center size-8 md:size-10 bg-white rounded-full"><i className="   fa-solid text-sm md:text-xl text-black fa-arrow-right"></i></div>
            </div>
        </div>
    )
}
export default End;