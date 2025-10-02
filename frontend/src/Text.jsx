import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Text() {

    useGSAP(()=>{
             gsap.from("#title,#sub",{
                opacity:0,
                delay:0.8,
                y:-10,
                stagger:0.3
             })
             
    },[])


    return (
        <div className=" flex items-center justify-center mt-10 flex-wrap flex-col gap-7">
            <h1 id="title"  className=" text-5xl text-white font-bold">Cryptography.</h1>

            <div className=" flex justify-center items-center m-3  h-20 max-w-[35rem]"><h2 id="sub" className=" text-xl text-gray-400 md:text-gray-300 font-medium text-center">A next-gen crypto platform where decentralization meets simplicity — powered by real-time APIs and user-first design.</h2></div>
        </div>
    )
}
export default Text;