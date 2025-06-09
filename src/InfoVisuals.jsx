import { div } from "framer-motion/client";
import { useState } from "react";
import VideoText from "./VideoText";
import Video from "./Video";
import VideoButton from "./VideoButton";

function InfoVisual() {
    const [live, islive] = useState(true)
    const texts1 = {
        heading: "Live Crypto Tracking",
        sub: "Keep your eyes on the market with up-to-date prices from top cryptocurrencies. Powered by CoinGecko API, your data is always real-time and reliable."
    }
    const text2 = {
        heading: "Minimal UI, Max Performance",
        sub: "Built with modern web technologies and a clean, Polygon-inspired design — your experience is fast, distraction-free, and made for exploration"
    }
    const url = {
        url1: "https://polytech-assets.polygon.technology/videos/solutions/pos.mp4",
        url2: "https://polytech-assets.polygon.technology/videos/solutions/Supernets.mp4"
    }
    return (
        <div className="w-full max-w-screen h-fit mt-3 flex  items-center gap-y-10 flex-col">
            {/* Heading*/}
            <h1 className=" text-[6vw] text-white font-bold">Next-Gen Crypto Dashboard</h1>

            {/* the button ui part */}
            <div className=" bg-white/10 rounded-4xl backdrop-blur-2xl shadow h-12 w-[60%] max-w-64 border-2 flex items-center flex-row ">
                <div className={`rounded-4xl h-full w-[40%] hover:bg-white/80 cursor-pointer shadow ${live ? "bg-white" : "bg-transparent"} flex justify-center items-center transition-all ease-in-out duration-200`} onClick={() => islive(true)}>
                    <h1 className={`${live ? "text-black" : "text-white"} font-bold`}>Live</h1>
                </div>
                <div className={`rounded-4xl h-full w-[60%] hover:bg-white/80 cursor-pointer ${!live ? "bg-white" : "bg-transparent"} flex justify-center items-center transition-all ease-in-out duration-200`} onClick={() => islive(!live)}>
                    <h1 className={`${!live ? "text-black" : "text-white"} font-bold`}>UI/UX</h1>
                </div>
            </div>

            {/* Dynamic part */}
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-items-center ">
                {/* video's text part */}
                <VideoText heading={live ? texts1.heading : text2.heading} sub={live ? texts1.sub : text2.sub} />
                {/* Video Part */}
                <Video url={live ? url.url1 : url.url2} />
            </div>
            {/* Video Button Links */}
            <VideoButton heading1="Prices" heading2="About" url1="" url2="" />

            {/* the 2nd Video Part */}
            
            <div className=" w-full grid grid-cols-1 md:grid-cols-2 items-center justify-items-center ">
                {/* video's text part */}
                <VideoText heading="Explore" sub="Dive into the code or connect with me professionally.Track top crypto coins in real-time with a clean, responsive interface. Made for clarity." />
                {/* Video Part */}
                <Video url="https://polytech-assets.polygon.technology/videos/solutions/Miden.mp4.mp4" />
            </div>
            <VideoButton heading1="GitHub" heading2="Linkedln" url1="https://github.com/Kartikey-Pathak" url2="https://www.linkedin.com/in/kartikey-pathakb580297/" />
        </div>
    )
}
export default InfoVisual;