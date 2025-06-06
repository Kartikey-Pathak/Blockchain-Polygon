import { div } from "framer-motion/client";

function Bg(){
    return(
        <div className="flex items-center justify-between">
           <img className=" size-40 absolute left-0 z-25 md:size-80 md:top-25" src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/662741410889f2489acd78d8_left.svg" alt="IMG" />
           <img className=" size-40 absolute z-25 right-0 top-96 md:top-25 md:size-80 " src="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/6627414178f226ce86b98804_right.svg" alt="" />

        </div>
    )
}
export default Bg;