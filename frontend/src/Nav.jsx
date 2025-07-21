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
  }, [hover])
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

  return (
    <div>
      <nav>
        <div className="bg-white/3 backdrop-blur-md w-full h-20 z-30 flex items-center fixed top-0 justify-between">
          <Link to="/">
            <div className="h-10 w-36 m-3 flex justify-start items-center relative cursor-pointer">
              <img src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/64db31746dec8ad339c4a315_logo-light-mode.svg" className=" h-10 w-auto z-10 absolute" alt="" />
              <h1 className=" ml-12 font-medium text-2xl text-white absolute z-20">PolyDash</h1>
            </div>
          </Link>
          {!nav ?
            <div className="m-10 flex-row flex">
              {!menu ?
                <i className="fa-solid order-2 fa-bars text-white text-3xl" onClick={() => showmenu(!menu)}></i> :
                <i className="fa-solid order-2 fa-xmark text-white text-3xl" onClick={() => showmenu(!menu)}></i>
              }
              <div className=" flex items-center justify-center">
                <Link to="/user">
                  <h1>
                    {
                      auth ? <i class="fa-solid fa-user-secret  mr-10 hover:text-white/40 transition-all cursor-pointer font-semibold text-4xl text-white"></i> : <i className=" mr-10 fa-solid hover:text-white/40 transition-all cursor-pointer fa-circle-user font-semibold text-4xl text-white"></i>

                    }
                  </h1>
                </Link>
              </div>
            </div> :
            <div className="flex flex-row justify-start items-center gap-10 mr-10">
              {
                arr.map((item, idx) => (
                  <div className=" px-12 py-3 rounded-4xl hover:bg-white/20 cursor-pointer transition-all" onMouseEnter={() => sethover(idx)} onMouseLeave={() => sethover(null)} key={idx}>
                    <a href={mp[item]}><span className=" font-semibold text-[1.1rem]">{item}</span></a>

                    {/* {hover==idx?
                   <div ref={boxref} className={`opacity-0 absolute z-30 ${idx==3?"right-36":"mr-0"} ${idx==2?"right-64":"mr-0"} bg-[#111111] rounded-3xl h-0 w-0`}>
                              <HoverBox idx={idx}/>
                   </div>:null
                   } */}
                  </div>
                ))
              }
              <Link to="/user">
                <h1>
                  {
                    auth ? <i class="fa-solid fa-user-secret  hover:text-white/40 transition-all cursor-pointer font-semibold text-4xl text-white"></i> : <i className="fa-solid hover:text-white/40 transition-all cursor-pointer fa-circle-user font-semibold text-4xl text-white"></i>

                  }
                </h1>
              </Link>

            </div>

          }
        </div>
      </nav>
      <Show menu={menu} />

    </div>
  )
}
export default Nav;