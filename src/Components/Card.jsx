import { div } from "framer-motion/client";

function Card({ title }) {
    let data = {
        "Build": ""
    }
    return (
        <>
            <div className=" h-32 max-w-[25rem] w-[90%] bg-white/12 shadow-lg backdrop-blur-xl rounded-xl border border-white/11 relative">
                <div className=" m-5 flex-col gap-2 flex">
                    <h1 className=" font-medium text-2xl text-white">{title}</h1>

                    <h2 className="text-md text-gray-300 font-medium flex flex-col">
                        <span>Get access to documentation,</span>
                        <span>And Clone The Repo</span>
                    </h2>
                </div>
                <div className=" absolute right-3.5 top-20 rounded-full size-8 flex justify-center items-center bg-white/14 shadow-lg backdrop-blur-xl"><i className=" text-md text-white/90 fa-solid fa-arrow-right"></i></div>

            </div>
        </>
    )
}
export default Card;