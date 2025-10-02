import { Link, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import { useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MyCoinsBtn from './Components/MyCoinsBtn';
import { h1 } from 'framer-motion/client';
import Chart from './Components/Chartdisplay';
import Chartdisplay from './Components/Chartdisplay';


function Data() {
    const location = useLocation();
    const [low, high] = useState()
    const [msg, setmsg] = useState();
    const [errmsg, seterrmsg] = useState();
    const [loading, setLoading] = useState(false);
    const [chartdata,setchartdata]=useState();

    const coin = location.state;

    const handlesubmit = async (savecoin) => {
        setLoading(true); // disable button & show text
        let email = localStorage.getItem('signupEmail');
        try {
            let resp = await fetch("https://blockchain-polygon.onrender.com/user/coins/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ savecoin, email })
            })
            let result = await resp.json();
            if (resp.status === 200) {
                setmsg("Coin Saved Thanks For Using PolyDash !");
            }
            if (resp.status === 404) {
                setmsg("This Coin Is Already Saved");
            }
            console.log(result);
        } catch (err) {
            console.log("Problem Occured ,Server Error", err);
            seterrmsg("Server Error Report To User.");

        } finally {
            setLoading(false); // enable button back
        }

    }

    //Play Animation for the message
    useEffect(() => {
        if (msg) {
            gsap.to("#mssg", {
                opacity: 1,
                duration: 0.8,
                delay: 0.1,
            });
        }

        setTimeout(() => {
            setmsg();
        }, 10000);
    }, [msg]); // run animation after msg state is updated

    //APi FOR CHART..
    useEffect(() => {
        const chart = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY
                }
            };
            fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=inr&days=10&interval=daily`, options)
                .then(res => res.json())
                .then(res => setchartdata(res))
                .catch(err => console.error(err));
        }

        chart();
    }, [])


    return (
        <div className=" w-full max-w-screen md:min-h-screen h-[100rem] md:h-[99rem] lg:h-[70rem] relative bg-black">
            <header>
                <Nav />
            </header>

            <main>
                <div className="w-ful max-w-screen h-[35rem] flex items-center justify-center">
                    <div className=" mt-[50rem] md:mt-[60rem] lg:mt-[30rem]  flex items-center justify-center w-full h-fit flex-col lg:flex-row ">


                        {/* information */}
                        <div className=" h-fit w-full mt-12 flex items-start flex-col  md:order-1 lg:order-2">
                            <h1 className="text-4xl text-white font-semibold mt-3 mx-auto">Coin Info</h1>

                            <div className=" h-20 w-[90vw]  md:w-[25vw]  items-center justify-center  m-10 flex flex-col">
                                <div className="h-1/2 w-full flex items-center justify-start flex-row">

                                    <div className="w-full h-[3.4rem] flex items-start gap-1 justify-start">
                                        <div className=' h-full w-1/6 md:w-14 flex items-center justify-center m-3'>
                                            <img src={coin.image} className="h-full w-full object-cover" alt="" />
                                        </div>
                                        <h1 className="text-white text-xl text-center mt-3">{coin.name}</h1>
                                    </div>
                                </div>

                                <div className="h-full w-full flex items-end justify-end mt-5">
                                    <div className=" h-full w-full flex items-center justify-center gap-5">
                                        <h1 className="text-white text-3xl font-semibold">₹{coin.current_price.toLocaleString('en-IN') ?? 'N/A'}</h1>
                                        <h1 className=" text-green-700 text-xl">{coin.price_change_percentage_24h.toFixed(2) ?? 'N/A'}</h1>
                                    </div>
                                </div>
                            </div>

                            <h1 className=' font-bold text-white text-sm m-10'>Details</h1>


                            <div className=' w-full flex justify-center flex-col gap-10 items-center'>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-[4vw] md:text-2xl font-semibold'>Market Cap</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>₹{coin.market_cap?.toLocaleString('en-IN') ?? 'N/A'}</h1>
                                </div>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-[4vw]  md:text-2xl font-semibold'>Fully Diluted Valuation</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>₹{coin.fully_diluted_valuation?.toLocaleString('en-IN') ?? 'N/A'}</h1>
                                </div>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Total Supply</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.total_supply?.toLocaleString('en-IN') ?? 'N/A'}</h1>
                                </div>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Max Supply</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.max_supply ? coin.max_supply.toLocaleString('en-IN') : 'N/A'}</h1>
                                </div>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>24h Volume</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.total_volume?.toLocaleString('en-IN') ?? 'N/A'}</h1>
                                </div>
                                <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                    <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Last Updated</h1>
                                    <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{new Date(coin.last_updated).toLocaleString() ?? 'N/A'}</h1>
                                </div>

                                {/* Save Button */}
                                <div onClick={() => { handlesubmit(coin.id) }} className={` w-[35vw] h-12 max-w-[17rem] absolute bottom-150 z-[10] lg:bottom-10 ${loading ? "bg-green-800" : "bg-green-600"} flex items-center justify-center  rounded-4xl  hover:bg-green-800 hover:scale-95 transition-all cursor-pointer`}>
                                    <h1 className=' text-xl font-semibold text-white'>{loading ? 'Saving...' : 'Save'}</h1>
                                </div>
                                <br />


                            </div>


                        </div>

                        {/* graph */}
                        {chartdata?
                        <div className="md:w-[90%] w-[90%] md:h-[25rem] h-[16rem] mt-20 lg:mt-0 order-1 flex items-center justify-center rounded-4xl  bg-white/90">
                          <Chartdisplay chartdata={chartdata}/>
                          </div>
                        :
                        <div className="md:w-[90%] w-[90%] md:h-[25rem] h-[16rem] order-1 flex items-center justify-center rounded-4xl  bg-white/90"> 
                        <span className="loading loading-bars loading-xl text-black"></span>
                        </div>
                        }


                    </div>
                </div>
            </main>

            {msg ?
                <div className=' flex justify-center items-center absolute bottom-135 md:bottom-120 z-[100] left-0 right-0'>
                    <div role="alert" id='mssg' className=" opacity-0 alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{msg}</span>
                    </div>
                </div> : null
            }
            {/* If Any Server Occurs */}
            {errmsg ?
                <div className=' flex justify-center items-center absolute bottom-135 md:bottom-110 z-[100] left-0 right-0'>
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{errmsg}</span>
                    </div>
                </div> : null
            }


            <div className=' absolute bottom-50 md:bottom-20 lg:bottom-30  right-0 left-0'>
                <MyCoinsBtn />
            </div>

            <h1 className=' absolute left-5 bottom-10 font-semibold text-[1rem] text-white/20'>Developer ~ Kartikey Pathak.</h1>

        </div>
    )
}
export default Data;