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

        <div className=" w-[100%] md:w-[95%] relative">
            {!loading ?
                (msg ? Allcoins.filter(coin => coin.name.toLowerCase().includes(msg.toLowerCase())) : Allcoins)
                    .map((data, idx) => (
                        <Link  to="/prices/data" key={idx} state={data}><div key={idx} className="grid grid-cols-4 mt-3 md:gap-50 gap-5  w-full border-2 hover:bg-gray-700 hover:rounded-2xl transition-all cursor-pointer border-gray-900 h-15 rounded-4xl items-center justify-evenly md:justify-between">
                            <div className=" flex flex-row items-center gap-2  md:gap-5 ml-2 md:ml-10">
                                <img className=" object-cover md:size-10 size-8" src={data.image} alt="" />
                                <h1 className=" font-medium text-xl md:text-[1.5rem]">{idx + 1}</h1>
                            </div>
                            <h1 className=" font-medium text-[1.2rem] md:text-[1.5rem] flex justify-center text-center whitespace-nowrap">{data.name.length >= 10 ? data.name.substring(0, 10) + '...' : data.name}</h1>
                            <h1 className="  font-medium text-[1.2rem] md:text-[1.5rem] flex justify-center text-center">₹{data.current_price}</h1>
                            <h1 className="text-[1.2rem] md:text-[1.4rem] text-green-500 flex justify-center text-center">{Math.round(data.price_change_percentage_24h)}%</h1>
                            {/* <h1 className="text-[1.2rem] text-green-500 font-medium md:text-[1.4rem] text-center flex justify-center">{Math.round(data.market_cap_change_percentage_24h)}%</h1> */}
                        </div></Link>
                    ))
                : <div className=" flex items-center justify-center mt-20"><span className="loading loading-infinity loading-xl"></span></div>
            }




        </div>
    )
}
export default GetPrice;
