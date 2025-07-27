import { div, h1 } from "framer-motion/client";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function GetPrice({msg}) {
    const [Allcoins, setcoins] = useState([]);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        const theApi = () => {
            setloading(true);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY
                }
            };

            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr', options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setcoins(res);
                })
                .catch(err => console.error(err));

            setTimeout(() => { setloading(false); }, 300)
        }
        theApi();

        const interval = setInterval(theApi, 60000); // 🔁 fetch every 0 seconds

        return () => clearInterval(interval); // cleanup when component unmounts

    }, [])

    return (

        <div className=" w-[100%] md:w-[90%] relative">
            {!loading ?
                (msg ? Allcoins.filter(coin => coin.name.toLowerCase().includes(msg.toLowerCase())) : Allcoins)
                    .map((data, idx) => (
                        <Link  to="/prices/data" key={idx} state={data}><div key={idx} className="grid grid-cols-4 mt-3 md:gap-50 gap-5  w-full border-b-2 hover:bg-gray-700 hover:rounded-2xl transition-all cursor-pointer border-gray-900 h-10 items-center justify-evenly md:justify-between">
                            <div className=" flex flex-row items-center gap-2 md:w-7 md:gap-5 ml-1">
                                <img className=" object-cover md:size-7 size-6" src={data.image} alt="" />
                                <h1 className=" font-medium md:text-[1.2rem]">{idx + 1}</h1>
                            </div>
                            <h1 className=" font-semibold text-sm md:text-[1.3rem] flex justify-center text-center whitespace-nowrap">{data.name.length >= 10 ? data.name.substring(0, 10) + '...' : data.name}</h1>
                            <h1 className=" font-bold text-sm md:text-xl flex justify-center text-center">₹{data.current_price}</h1>
                            {/* <h1 className="text-sm md:text-xl flex justify-center text-center">{Math.round(data.price_change_percentage_24h)}%</h1> */}
                            <h1 className="text-sm md:text-xl text-center flex justify-center">{Math.round(data.market_cap_change_percentage_24h)}%</h1>
                        </div></Link>
                    ))
                : <div className=" flex items-center justify-center mt-20"><span className="loading loading-infinity loading-xl"></span></div>
            }




        </div>
    )
}
export default GetPrice;
