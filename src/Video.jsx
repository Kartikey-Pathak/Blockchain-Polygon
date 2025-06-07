function Video({url}) {
    return (
        <div className=" w-[80%] rounded-2xl max-w-[28rem] outline-none ">
            <video className=" h-full w-full rounded-2xl border-none outline-none object-cover" src={url} muted
                playsInline autoPlay loop></video>
        </div>

    )
}
export default Video;