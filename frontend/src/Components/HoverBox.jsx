import { div } from "framer-motion/client";

function HoverBox({idx}){
    return(
        <div>

            {idx==1?
            <div className=" h-full w-full flex items-center flex-col gap-8 justify-center">
                <div className="mt-10 bg-black shadow-2xl shadow-black backdrop-blur-3xl rounded-3xl px-10 py-10">
                <i className="fa-brands hover:text-white/40 fa-github text-[8rem] text-white"></i>
                </div>
                {/* texts */}
                <h1 className=" mt-10 text-2xl">Repo : <span className=" text-blue-500"><a href="https://github.com/Kartikey-Pathak/Blockchain-Polygon">PolyDash</a></span></h1>
                 <h1 className=" text-2xl">Profile : <span className=" text-blue-500"><a href="https://github.com/Kartikey-Pathak">Kartikey-Pathak</a></span></h1>
            </div>:null
            }

        </div>
    )
}
export default HoverBox;
