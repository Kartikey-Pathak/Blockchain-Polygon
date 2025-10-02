import { div } from "framer-motion/client";

function Header(){
    return(
        <div>

             <br />
             <div className=" flex justify-center items-center"> 
             <div className=" bg-white/20 h-10 transition duration-150 rounded-2xl w-80 border-2 border-black mt-28 flex justify-center items-center gap-2">
                 <h1 className="  text-white  ">Introducing: Aggregated Blockchains</h1>
                 <div className=" rounded-full size-6 bg-[#9C2CC4] flex justify-center items-center"><i class="fa-solid fa-arrow-right text-[0.7rem] text-white"></i></div>
             </div>
             </div>
        </div>
    )
}
export default Header;