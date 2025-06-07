import { div } from "framer-motion/client";

function Visual({source}){
    return(
        <div className="w-screen h-[20rem] mt-3 flex justify-center items-center">
            <div className="h-[80%] w-[80%] rounded-2xl border-none outline-none">
            <video className=" h-full w-full rounded-2xl border-none outline-none object-cover"  src={source} muted 
                playsInline autoPlay loop></video>
                </div>

        </div>
    )
}
export default Visual;