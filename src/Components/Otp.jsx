import { div } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";


function Otp() {
      const inputRef = useRef(null);
        const [click, setclick] = useState(false);

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
        <div className=" bg-black max-w-screen w-full flex justify-center items-center h-screen">

            <div className=" flex items-center flex-col h-[120vw] max-h-[35rem] md:max-h-[36rem] md:h-[70vw] w-[90%] md:w-[40%] bg-gray-800 rounded-4xl gap-20">
                <h1 className=" text-4xl font-semibold text-white mt-5">Verify Email</h1>
               
                <form action="" className=" flex items-center justify-center flex-col w-full mt-10">
                    <input ref={inputRef} type="number" id="txt" onClick={() => { handleClick(); setClick(!click); }} className=" cursor-pointer hover:border-white/20 transition-all outline-none w-[60%] text-2xl text-center border-4 border-white rounded-2xl p-2" placeholder="Enter OTP" />

                    <button className=" p-6 bg-black rounded-2xl px-20 font-semibold text-xl mt-20 hover:bg-black/60 cursor-pointer transition-all">Verify</button>
                </form>
                
            </div>

        </div>
    )
}
export default Otp;