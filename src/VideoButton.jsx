function VideoButton({heading1,heading2,url1,url2}) {
    return (
        <div className=" w-full max-w-screen flex items-center justify-center">
            <div className="h-28 w-[80%] md:w-[40%] flex justify-center items-center gap-x-3 ">
                <div className=" h-12 w-[50%] bg-[#6154F3] hover:shadow-2xl hover:backdrop-blur-xl hover:shadow-[#6154F3] cursor-pointer transition-all rounded-4xl flex justify-evenly items-center ">
                    <h1 className=" text-white font-bold md:text-xl" >{heading1}</h1>
                    <i class="fa-solid fa-arrow-right font-light text-md md:text-xl -rotate-z-45"></i>

                </div>
                <div className=" h-12 w-[50%] bg-white hover:shadow-2xl hover:backdrop-blur-xl hover:shadow-[#6154F3] hover:bg-[#6154F3] cursor-pointer transition-all rounded-4xl flex justify-evenly items-center  ">
                    <h1 className=" text-black font-bold md:text-xl" >{heading2}</h1>
                    <i class="fa-solid fa-arrow-right font-light text-md md:text-xl text-black -rotate-z-45"></i>
                </div>
            </div>


        </div>

    )
}
export default VideoButton;