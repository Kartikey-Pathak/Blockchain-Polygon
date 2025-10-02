import { div } from "framer-motion/client";
import Nav from "./Nav";
import End from "./End";
import Foot from "./Foot";
import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GetPrice from "./GetPrice";
import MyCoinsBtn from "./Components/MyCoinsBtn";
gsap.registerPlugin(ScrollTrigger);

// The Price Page




function Prices() {
    const titleref = useRef(null);
    const heroref = useRef(null);
    const inputref = useRef();
    const [input, setinput] = useState();
    const [msg, setmsg] = useState();

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
            opacity: 0.1,
            duration: 1,
            delay: 0.2,
            scale: 0.9,
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
                        <h1 className=" text-white font-bold text-[2rem] md:text-[2.5rem]">Current Prices of Top Cryptocurrencies</h1>
                        <h4 className=" text-white/50 font-semibold text-[1.4rem] md:text-[2rem]">Monitor, compare, and explore crypto price movements.</h4>
                    </div>
                    {/* Search And Button */}


                    <div className=" flex flex-row w-full max-w-screen justify-center gap-1 items-center mt-10">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();    // prevent page reload
                                setmsg(input);         // run your search
                            }}
                            className=" flex items-center gap-1 w-full justify-center flex-row">
                            <input onChange={(e) => setinput(e.target.value)} ref={inputref} value={input||""} type="text" id="inp" placeholder="Search" className=" border-none outline-none placeholder:text-black placeholder:text-sm px-3 font-medium text-black w-[50%] max-w-[24rem] rounded-xl h-10 bg-white" name="" />
                            <button type="submit"
                                className=" bg-[#83B4FF] hover:bg-[#83D4FF] cursor-pointer transition-all duration-150 text-black h-10 rounded-xl w-[20vw] md:w-[10vw] text-sm font-bold">Search</button>
                        </form>
                    </div>


                    {/* The Hero Price Part */}

                    <div ref={heroref} className=" relative mt-10 md:w-[95%] w-[95%] h-[50rem] rounded-xl overflow-y-scroll md:bg-[#1B1E2D]/30 flex flex-col items-center">
                        <h1 className=" md:text-3xl text-2xl font-bold text-white m-1">Top Movers</h1>
                        <br />
                        {/* <div className="flex flex-row  gap-2.5 w-[90%] border-b-2 border-gray-700 h-10 items-center justify-between">
                            <h1 className=" font-semibold text-[1.1rem] flex justify-center text-center md:text-xl md:ml-3 lg:mr-6">#</h1>
                            <h1 className=" font-semibold flex justify-center text-center text-[1.1rem] md:text-xl">Coins</h1>

                            <h1 className=" font-semibold flex justify-center text-center text-[1.1rem] md:text-xl">Price</h1>

                            {/* <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">24hrs</h1> */}

                            {/* <h1 className=" font-semibold flex justify-center text-center text-[1.1rem] md:text-xl md:mr-3 lg:ml-6">Market cap</h1>
                        </div> */}
                        <GetPrice msg={msg} />
                    </div>


                </div>


            </main>

            {/* A Route Compoennt With a Button To Route to the Coins Saved List Page */}
            <MyCoinsBtn />

            <footer>
                <End />
                <Foot />
            </footer>

        </div>
    )
}
export default Prices;