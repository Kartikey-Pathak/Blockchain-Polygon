import { Link, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import { useState } from 'react';

function Data() {
    const location = useLocation();
    const [low, high] = useState()
    const coin = location.state;
    return (
        <div className=" w-full max-w-screen md:min-h-screen h-[90rem] md:h-[70rem] relative bg-black">
            <header>
                <Nav />
            </header>

            <main>
                <div className="w-ful max-w-screen h-[35rem] flex items-center justify-center">
                    <div className="mt-50 flex items-center justify-center w-full h-full flex-col lg:flex-row ">
                        

                        {/* information */}
                        <div className=" h-full md:w-full flex items-start flex-col border-2 md:overflow-y-scroll md:order-2">
                            <h1 className="text-4xl text-white font-semibold mt-3 mx-auto">Coin Info</h1>
                            <div className=" h-20 w-[60vw]  md:w-[30vw] items-center justify-center  m-10 flex flex-col">
                                <div className="h-1/2 w-full flex items-center justify-start flex-row">

                                    <div className="w-1/4  h-full flex items-start gap-5 justify-start">
                                        <img src={coin.image} className="h-full w-full object-cover" alt="" />
                                        <h1 className="text-white text-2xl">{coin.name}</h1>
                                    </div>

                                </div>

                                <div className="h-1/2 w-full flex items-center justify-center">
                                    <div className=" h-full w-full flex items-center justify-center gap-5">
                                        <h1 className="text-white text-3xl font-semibold">₹{coin.current_price.toLocaleString('en-IN')}</h1>
                                        <h1 className=" text-green-700 text-xl">{coin.price_change_percentage_24h.toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>

                            <h1 className=' font-bold text-white text-sm m-10'>Details</h1>

  
                            <div className=' w-full flex justify-center flex-col gap-10 items-center'>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Market Cap</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>₹{coin.market_cap.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl  md:text-2xl font-semibold'>Fully Diluted Valuation</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>₹{coin.fully_diluted_valuation.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Total Supply</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.total_supply.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Max Supply</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.max_supply ? coin.max_supply.toLocaleString('en-IN') : 'N/A'}</h1>
                            </div>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>24h Volume</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{coin.total_volume.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className=' w-[80%] md:w-[70%] px-5 border-b-2 border-gray-600 flex items-start gap-5 flex-row justify-between'>
                                <h1 className=' text-gray-400 text-xl md:text-2xl font-semibold'>Last Updated</h1>
                                <h1 className='text-gray-400 text-xl md:text-2xl font-semibold'>{new Date(coin.last_updated).toLocaleString()}</h1>
                            </div>

                              {/* Save Button */}
                            <div className=' w-[30vw] max-w-[15rem] bg-green-600 flex items-center justify-center py-3 rounded-4xl hover:bg-green-800 hover:scale-95 transition-all cursor-pointer'>
                                <h1 className=' text-xl font-semibold text-white'>Save</h1>
                            </div>
                            <br />

                    
                            </div>


                        </div>

                        {/* graph */}
                        <div className="md:w-[90%] w-[90%] h-[16rem] order-2 flex items-center justify-center rounded-4xl  bg-white">
                            f


                        </div>


                    </div>
                </div>
            </main>


        </div>
    )
}
export default Data;