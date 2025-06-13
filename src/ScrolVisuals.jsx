import { div } from "framer-motion/client";
import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function ScrolVisuals() {

     useGSAP(()=>{
        gsap.from("#time-title",{
            opacity:0,
            duration:1,
            scale:0.7,
            scrollTrigger:{
                trigger:"#time-title",
                scroller:"body",
                scrub:2,
                start:"top 90%",
                end:"top 40%"
            }
        })

    },[]);



    return (
        <div className="w-full max-w-screen h-fit md:h-fit mt-3 flex justify-start gap-y-10 flex-col">
            <h1 id="time-title" className=" text-white font-bold text-2xl m-3 md:m-5 md:text-3xl">Time to roll up your sleeves</h1>

            <div className=" w-full max-w-screen grid grid-cols-1 md:grid-cols-2 gap-y-5 justify-center place-items-center">
                {/* Cards */}
                <Card heading="Live Price Tracking" sub="Real-time updates of top crypto coins using trusted APIs like CoinGecko." img="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/63df611401f0361781d04f2c_Connect.webp" url="https://www.coingecko.com/" />
                <Card heading="Mobile-First Design" sub="Inspired by Polygon's sleek UI, optimized for all screen sizes." img="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/63df6531c6567a1e2f423061_Matic.avif" url="https://polygon.technology/" />
                <Card heading="Fast & Lightweight" sub=" Built with React + Vite for blazing fast performance and smooth UI interactions." img="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/63df5f19d3e9be19197b0690_Build.webp" url="https://vite.dev/guide/" />
                <Card heading="Documentaion" sub="Comprehensive Documentation for Easy Maintenance & Collaboration" img="https://cdn.prod.website-files.com/637359c81e22b715cec245ad/63df654df46ebf677393edd8_Learn.avif" url="https://github.com/Kartikey-Pathak/Blockchain-Polygon/blob/main/README.md"/>
            </div>

        </div>
    )
}
export default ScrolVisuals;