import { Link, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import { useState } from 'react';

function Data() {
    const location = useLocation();
     const [low,high]=useState()
    const coin = location.state;
    return (
        <div className=" w-full max-w-screen min-h-screen relative bg-black">
            <header>
                <Nav/>
            </header>

            <main>
                <div className="w-ful max-w-screen h-[35rem] flex items-center justify-center">
                    <div className="mt-50 flex items-center justify-center w-full h-full flex-row ">
                    {/* graph */}
                    <div className="w-1/2 h-full flex items-center justify-center rounded-4xl bg-white">
                    f
                     

                    </div>

                    {/* information */}
                    <div className="border-2 border-white/60 rounded-3xl h-full w-full flex items-start flex-col">
                        <h1 className="text-4xl text-white font-semibold mt-3 mx-auto">Coin Info</h1>
                        <div className="border-2 border-white h-20 w-[17vw] m-10 flex flex-col">
                            <div className="h-1/2 w-full flex items-center justify-start flex-row">

                               <div className="w-1/4  h-full flex items-start gap-5 justify-start">
                               <img src={coin.image} className="h-full w-full object-cover" alt="" />
                               <h1 className="text-white text-2xl">{coin.name}</h1>
                               </div>

                            </div>

                            <div className="h-1/2 w-full flex items-center justify-center">
                             <div className=" h-full w-full flex items-center justify-center gap-5">
                                <h1 className="text-white text-3xl font-semibold">₹ {coin.current_price.toLocaleString('en-IN')}</h1>
                                <h1 className=" text-green-700 text-xl">{coin.price_change_percentage_24h.toFixed(2)}</h1>
                               </div>

                            </div>


                        </div>

                    </div>
                    </div>

                </div>

            </main>


        </div>
    )
}
export default Data;