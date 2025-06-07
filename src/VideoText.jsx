function VideoText({heading,sub}) {
    return (
            <div className="w-[90%] flex items-center flex-col text-center gap-y-2 md:order-2">
                <h1 className="text-[4vw] text-white font-bold">{heading}</h1>
                <h2 className=" font-medium text-white/50">{sub}</h2>
            </div>

        
    )
}
export default VideoText;