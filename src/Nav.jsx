import { div } from "framer-motion/client";
import { useState } from "react";
import Show from "./Show";

function Nav(){
    const [menu,showmenu]=useState(false)
    return(
        <div>
            <nav>
                <div className="bg-white/3 backdrop-blur-md w-full h-20 absolute z-30 flex items-center justify-between">
                <div className="h-10 w-36 m-3 flex justify-start items-center relative">
                  <img src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/64db31746dec8ad339c4a315_logo-light-mode.svg" className="h-10 w-auto z-10 absolute" alt="" />
                  <h1 className=" ml-12 font-medium text-2xl text-white absolute z-20">polygon</h1>
                  </div>
                  <div className="m-10">
                    {!menu?
                    <i className="fa-solid fa-bars text-white text-3xl" onClick={()=>showmenu(!menu)}></i>:
                    <i className="fa-solid fa-xmark text-white text-3xl" onClick={()=>showmenu(!menu)}></i>
                    }
                  </div>
                </div>
            </nav>
            <Show menu ={menu}/>
            
        </div>
    )
}
export default Nav;