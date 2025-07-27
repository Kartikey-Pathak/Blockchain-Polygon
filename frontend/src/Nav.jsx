import { div } from "framer-motion/client";
import { use, useEffect, useRef, useState } from "react";
import Show from "./Show";
import { Link } from "react-router-dom";
import { mp, arr } from "./data/ShowContents";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HoverBox from "./Components/HoverBox";

function Nav() {
  const boxref = useRef(null);
  const [menu, showmenu] = useState(false)
  const [nav, setnav] = useState(window.innerWidth > 1000);
  const [hover, sethover] = useState(null);
  const [loading, setLoading] = useState(false);

  let auth = localStorage.getItem("user");

  useEffect(() => {
    const handlesize = () => {
      const isWide = window.innerWidth > 1000;
      setnav(isWide);
      if (isWide) {
        showmenu(false); // Close menu if switching to desktop
      }
    }
    window.addEventListener("resize", handlesize);
    handlesize();

    return () => window.removeEventListener("resize", handlesize);
  }, [])
  useEffect(() => {
    gsap.to(boxref.current, {
      opacity: 1,
      delay: 0.1,
      height: 450,
      width: 550,
      ease: "power1.inOut"


    }
    );

  }, [hover])

  const logout = () => {
     setLoading(true); 
    localStorage.clear();
    setLoading(false);
    window.location.reload();
  }

  return (
    <div>
      <nav>
        <div className="bg-white/5 backdrop-blur-md w-full max-w-screen h-20 z-30 flex items-center fixed top-0 justify-between">
          <Link to="/">
            <div className="h-10 w-36 m-3 flex justify-start items-center relative cursor-pointer">
              <img src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/64db31746dec8ad339c4a315_logo-light-mode.svg" className=" h-10 w-full z-10 absolute" alt="" />
              <h1 className=" ml-12 font-medium text-2xl text-white absolute z-20">PolyDash</h1>
            </div>
          </Link>

          {!nav ?
            <div className="m-10 flex-row flex items-center justify-center h-full w-[20rem]">
              {!menu ?
                <i className="fa-solid order-2 fa-bars text-white text-3xl" onClick={() => showmenu(!menu)}></i> :
                <i className="fa-solid order-2 fa-xmark text-white text-3xl" onClick={() => showmenu(!menu)}></i>
              }
              <div className=" flex items-center justify-center  w-32 h-12 ">
                {
                  auth ? <div onClick={() => {
                    logout()
                  }} className={`flex items-center justify-center border-2 rounded-xl ${loading?"bg-red-500":"bg-red-700"} hover:bg-red-500 transition-all cursor-pointer border-gray-400 h-full w-20 bg-red-700`}>
                    <h1 className=" text-white font-semibold text-[1rem]">Log-Out</h1>
                  </div>

                    :
                    <div className="flex items-center justify-evenly w-full h-full  mr-20 flex-row order-1">
                      <Link to="/user" className=" h-full">
                        <div className="flex items-center justify-center border-2 rounded-xl hover:bg-white/70 transition-all cursor-pointer border-gray-400 h-full w-16 bg-white">
                          <h1 className=" text-black font-semibold text-[1rem]">Log-In</h1>
                        </div>
                      </Link>

                      <Link to="/user/create" className=" h-full m-4">
                        <div className="flex items-center justify-center border-2 rounded-xl hover:bg-black/10 transition-all cursor-pointer border-black h-full w-20 bg-black">
                          <h1 className=" text-white font-semibold text-[1rem]">Sign-Up</h1>
                        </div>
                      </Link>

                    </div>
                }


              </div>
            </div> :
            <div className="flex flex-row justify-start items-center gap-10 ">
              {
                arr.map((item, idx) => (
                  <div className=" h-12 md:w-20 lg:w-24 xl:w-40 flex items-center justify-center rounded-4xl hover:bg-white/20 cursor-pointer transition-all" onMouseEnter={() => sethover(idx)} onMouseLeave={() => sethover(null)} key={idx}>
                    <a href={mp[item]}><span className=" font-semibold text-[1.1rem]">{item}</span></a>

                    {/* {hover==idx?
                   <div ref={boxref} className={`opacity-0 absolute z-30 ${idx==3?"right-36":"mr-0"} ${idx==2?"right-64":"mr-0"} bg-[#111111] rounded-3xl h-0 w-0`}>
                              <HoverBox idx={idx}/>
                   </div>:null
                   } */}
                  </div>
                ))
              }


              {
                auth ? <div onClick={() => {
                  logout()
                }} className={`flex items-center justify-center rounded-xl ${loading?"bg-red-500":"bg-red-700"} hover:bg-red-500 transition-all cursor-pointer border-gray-400 m-5  h-10 w-24 `}>
                  <h1 className=" text-white font-semibold text-[1rem]">Log-Out</h1>
                </div>

                  :
                  <div className="flex items-center justify-evenly   h-12 w-72 flex-row">
                    <Link to="/user" className=" h-full">
                      <div className="flex items-center justify-center border-2 rounded-xl hover:bg-white/70 transition-all cursor-pointer border-gray-400 h-full w-24 bg-white">
                        <h1 className=" text-black font-semibold text-[1rem]">Log-In</h1>
                      </div>
                    </Link>

                    <Link to="/user/create" className=" h-full">
                      <div className="flex items-center justify-center border-2 rounded-xl hover:bg-black/10 transition-all cursor-pointer border-black h-full w-24 bg-black">
                        <h1 className=" text-white font-semibold text-[1rem]">Sign-Up</h1>
                      </div>
                    </Link>

                  </div>
              }



            </div>

          }
        </div>
      </nav>
      <Show menu={menu} />

    </div>
  )
}
export default Nav;