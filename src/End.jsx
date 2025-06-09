import { div } from "framer-motion/client";

function End(){
    return(
        <div className=" w-full max-w-full h-[30rem] mt-10 flex justify-center items-center">
            <div className=" w-[95%] h-[90%] rounded-4xl">
                <video className="h-full w-full rounded-2xl border-2 border-white/10 object-cover" src="https://polytech-assets.polygon.technology/videos/homepage/newsletter.mp4" autoPlay loop playsInline muted></video>
            </div>
        </div>
    )
}
export default End;