import { div } from "framer-motion/client";

function HoverBox({idx}){
    return(
        <div>

            {idx==1?
            <div className=" h-full w-full flex items-center flex-col gap-10 justify-center">
                <div className="mt-10 bg-black shadow-2xl shadow-black backdrop-blur-3xl rounded-3xl px-10 py-10">
                <i className="fa-brands hover:text-white/40 fa-github text-[8rem] text-white"></i>
                </div>
                {/* texts */}
                <h1 className=" text-2xl">Repo : <span className=" text-blue-500"><a href="">PolyDash</a></span></h1>


            </div>:null
            }

        </div>
    )
}
export default HoverBox;