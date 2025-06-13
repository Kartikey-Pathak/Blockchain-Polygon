import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {mp,arr} from "./data/ShowContents";
import { useEffect, useRef } from "react";


function Show({ menu }) {

    const showref=useRef(null);

      useGSAP(()=>{
        if(menu){
        gsap.fromTo(showref.current,{
            opacity:0,
            scaleY:0,
            transformOrigin:"top"
        },{
            opacity:1,
            duration:0.4,
            scaleY:1,
            delay:0.1,
            ease:"power1.inOut",
            yoyo:true

        })}
    },[menu]);

     useEffect(() => {
        if (menu) {
            window.scrollTo({top:0,behavior:"smooth"})
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [menu]);

    return (
        <div className="">
                {menu ?
                    <div
                        className="h-full w-full bg-black grid grid-cols-1 absolute z-20" ref={showref}
                    >
                        <div className=" mt-20">
                            {

                                arr.map((item, index) => (
                                    <div key={index} className="h-20 w-full flex bg-black justify-between items-center border-b-2 border-gray-900 mt-7 relative z-30">

                                        <a href={mp[item]} className="flex justify-center items-center"> <h1 className=" text-white text-4xl font-medium m-3">{item}</h1>


                                       <i className="fa-solid fa-arrow-right text-2xl text-white absolute right-10"></i></a>
                                    </div>
                                ))
                            }
                        </div>
                     </div> :
                    null
                }
        </div>
    )
}
export default Show;