import { div } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
function Bg(){
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

     useGSAP(()=>{
             gsap.from(img1Ref.current,{
                opacity:0,
                delay:0.8,
                duration:1,
                x:20
             })
             gsap.from(img2Ref.current,{
                opacity:0,
                delay:0.8,
                duration:1,
                x:-20
             })
             
    },[])


    return(
        <div className="flex items-center justify-between">
           <img ref={img1Ref} className=" size-40 absolute left-0 z-10 md:size-80 md:top-25" src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/662741410889f2489acd78d8_left.svg" alt="IMG" />
           <img ref={img2Ref} className=" size-40 absolute z-10 right-0 top-96 md:top-25 md:size-80 " src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/6627414178f226ce86b98804_right.svg" alt="" />

        </div>
    )
}
export default Bg;