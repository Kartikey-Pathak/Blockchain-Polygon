import { a, div } from "framer-motion/client";
import { Link } from "react-router-dom";

function Card({ title,sub1,sub2,url}) {
    const islink=true?(url==="/prices"):false;

    const cardcontent=(
        <>
            <div className="h-32 max-w-[25rem] w-[90%] hover:scale-105 hover:bg-white/30 hover:shadow-2xl transition duration-150 cursor-pointer bg-white/12 shadow-lg backdrop-blur-xl rounded-xl border border-white/11 relative">
                <div className=" m-5 flex-col gap-2 flex">
                    <h1 className=" font-medium text-2xl text-white">{title}</h1>

                    <h2 className="text-md text-gray-300 font-medium flex flex-col">
                        <span>{sub1}</span>
                        <span>{sub2}</span>
                    </h2>
                </div>
                <div className=" absolute right-3.5 top-20 rounded-full size-8 flex justify-center items-center bg-white/14 shadow-lg backdrop-blur-xl"><i className=" text-md text-white/90 fa-solid fa-arrow-right"></i></div>

            </div>
            </>
             );
             if(url){
                return islink?(
                    <Link className="w-full max-w-screen flex justify-center items-center" to={url}>{cardcontent}</Link>
                ):
                <a className=" w-full max-w-screen flex justify-center items-center" href={url}>{cardcontent}</a> 
            }

            return cardcontent;
}
export default Card;