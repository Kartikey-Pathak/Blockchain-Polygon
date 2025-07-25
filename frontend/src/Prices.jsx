import { div } from "framer-motion/client";
import Nav from "./Nav";
import End from "./End";
import Foot from "./Foot";
import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GetPrice from "./GetPrice";
import MyCoinsBtn from "./Components/MyCoinsBtn";
gsap.registerPlugin(ScrollTrigger);

// The Price Page




function Prices() {
    const titleref = useRef(null);
    const heroref = useRef(null);

    useGSAP(() => {
        gsap.from(titleref.current, {
            opacity: 0,
            duration: 1.1,
            delay: 0.1,
            scale: 0.8,
        })
    }, []);

    useGSAP(() => {
        gsap.from(heroref.current, {
            opacity: 0.4,
            duration: 0.2,
            delay: 0.1,
            scale: 0.9,
            scrollTrigger: {
                trigger: heroref.current,
                scroller: "body",
                scrub: 2,

                start: "top 70%",
                end: "top 30%"


            }
        })
    }, []);



    return (
        <div className=' bg-[#000000] min-h-screen w-full max-w-screen relative'>
            <header>
                <Nav />
            </header>

            <main>
                <div className=" w-full max-w-screen h-fit pt-20 flex flex-col items-center">
                    {/* Text Part */}
                    <div ref={titleref} className=" gap-y-2 flex justify-center items-center flex-col text-wrap mt-20 text-center w-[80%]">
                        <h1 className=" text-white font-bold text-[5vw] md:text-[3vw]">Current Prices of Top Cryptocurrencies</h1>
                        <h4 className=" text-white/50 font-bold text-[3vw] md:text-[1.4vw]">Monitor, compare, and explore crypto price movements.</h4>
                    </div>
                    {/* Search And Button */}
                    <div className=" flex flex-row w-full max-w-screen justify-center gap-1 items-center mt-10">
                        <input type="text" id="inp" placeholder="Search" className=" border-none outline-none placeholder:text-black placeholder:text-sm px-3 font-medium text-black w-[50%] max-w-[24rem] rounded-xl h-10 bg-white" name="" />
                        <label htmlFor="inp"><button className=" bg-[#83B4FF] hover:bg-[#83D4FF] cursor-pointer transition-all duration-150 text-black h-10 rounded-xl w-[20vw] md:w-[10vw] text-sm font-bold">Search</button></label>
                    </div>

                    {/* The Hero Price Part */}

                    <div ref={heroref} className=" relative mt-10 md:w-[90%] w-[80%] h-[50rem] rounded-xl overflow-y-scroll bg-[#1B1E2D]/40 flex flex-col items-center">
                        <h1 className=" md:text-2xl text-md font-bold text-white">Top Movers</h1>
                        <br />
                        <div className="flex flex-row  gap-2.5 w-[90%] border-b-2 border-gray-700 h-10 items-center justify-evenly md:justify-between">
                            <h1 className=" font-semibold text-md flex justify-center text-center md:text-xl md:ml-3 lg:mr-6">#</h1>
                            <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">Coins</h1>

                            <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">Price</h1>

                            {/* <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">24hrs</h1> */}

                            <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl md:mr-3 lg:ml-6">Market cap</h1>
                        </div>
                        <GetPrice />
                    </div>


                </div>


            </main>
           
           {/* A Route Compoennt With a Button To Route to the Coins Saved List Page */}
            <MyCoinsBtn/>

            <footer>
                <End />
                <Foot />
            </footer>

        </div>
    )
}
export default Prices;